
<?php

namespace app\components;

use Yii;
use yii\base\Component;
use yii\helpers\Json;

/**
 * Service for interacting with OpenAI API
 */
class OpenAiService extends Component
{
    /**
     * @var string OpenAI API endpoint
     */
    private $apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    
    /**
     * @var string OpenAI API key
     */
    private $apiKey;
    
    /**
     * Initialize the component with API key from params
     */
    public function init()
    {
        parent::init();
        $this->apiKey = Yii::$app->params['openAiApiKey'];
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
        
        $response = $this->callOpenAiApi($prompt);
        
        if (!$response) {
            return false;
        }
        
        try {
            $content = $response['choices'][0]['message']['content'];
            // Extract JSON from the content (in case there's additional text)
            if (preg_match('/{.*}/s', $content, $matches)) {
                $jsonContent = $matches[0];
            } else {
                $jsonContent = $content;
            }
            
            $recipe = Json::decode($jsonContent, true);
            return $recipe;
        } catch (\Exception $e) {
            Yii::error("Failed to parse OpenAI response: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Call the OpenAI API with the given prompt
     * 
     * @param string $prompt The prompt to send to OpenAI
     * @return array|false The API response or false on failure
     */
    private function callOpenAiApi($prompt)
    {
        $data = [
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are a helpful culinary assistant specialized in European cuisine.'
                ],
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'temperature' => 0.7
        ];

        $ch = curl_init($this->apiEndpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, Json::encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->apiKey
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Timeout for the request
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Ensure we use HTTPS

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($httpCode !== 200) {
            Yii::error("OpenAI API error: HTTP $httpCode - Response: " . $response . " - cURL Error: " . $curlError);
            return false;
        }

        $decodedResponse = Json::decode($response, true);

        // Check if the response contains the expected keys
        if (!isset($decodedResponse['choices'][0]['message']['content'])) {
            Yii::error("OpenAI API error: Unexpected response format: " . $response);
            return false;
        }

        return $decodedResponse;
    }
}
