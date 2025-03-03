
<?php

namespace app\components;

use Yii;
use yii\base\Component;
use yii\helpers\Json;

/**
 * Service for interacting with Google Gemini API
 */
class GeminiService extends Component
{
    /**
     * @var string Gemini API endpoint
     */
    private $apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
    
    /**
     * @var string Gemini API key
     */
    private $apiKey;
    
    /**
     * Initialize the component with API key from params
     */
    public function init()
    {
        parent::init();
        $this->apiKey = Yii::$app->params['geminiApiKey'];
    }
    
    /**
     * Generate a recipe for the given dish name
     * 
     * @param string $dishName Name of the dish
     * @return array|false The recipe data or false on failure
     */
    public function generateRecipe($dishName)
    {
        $prompt = "Generate a recipe for {$dishName}. Include the following JSON structure:
        {
          \"title\": \"Full Recipe Title\",
          \"ingredients\": [\"ingredient1\", \"ingredient2\", ...],
          \"instructions\": \"Step-by-step cooking instructions\",
          \"cookingTime\": \"estimated time\",
          \"difficulty\": \"Easy/Intermediate/Advanced\"
        }
        Only output valid JSON, no other text.";
        
        $response = $this->callGeminiApi($prompt);
        
        if (!$response) {
            return false;
        }
        
        try {
            $content = $response['candidates'][0]['content']['parts'][0]['text'];
            // Extract JSON from the content (in case there's additional text)
            if (preg_match('/{.*}/s', $content, $matches)) {
                $jsonContent = $matches[0];
            } else {
                $jsonContent = $content;
            }
            
            $recipe = Json::decode($jsonContent, true);
            return $recipe;
        } catch (\Exception $e) {
            Yii::error("Failed to parse Gemini response: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Call the Gemini API with the given prompt
     * 
     * @param string $prompt The prompt to send to Gemini
     * @return array|false The API response or false on failure
     */
    private function callGeminiApi($prompt)
    {
        $data = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => $prompt
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7
            ]
        ];

        $url = $this->apiEndpoint . '?key=' . $this->apiKey;
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, Json::encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout for the request
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Ensure we use HTTPS

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($httpCode !== 200) {
            Yii::error("Gemini API error: HTTP $httpCode - Response: " . $response . " - cURL Error: " . $curlError);
            return false;
        }

        $decodedResponse = Json::decode($response, true);

        // Check if the response contains the expected keys
        if (!isset($decodedResponse['candidates'][0]['content']['parts'][0]['text'])) {
            Yii::error("Gemini API error: Unexpected response format: " . $response);
            return false;
        }

        return $decodedResponse;
    }
}
