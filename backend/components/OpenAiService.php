
<?php

namespace app\components;

use Yii;
use yii\base\Component;
use yii\helpers\Json;

class OpenAiService extends Component
{
    /**
     * The OpenAI API key
     */
    private $apiKey;
    
    /**
     * The OpenAI API endpoint
     */
    private $apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    
    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->apiKey = Yii::$app->params['openAiApiKey'];
    }
    
    /**
     * Generate a recipe for a dish using OpenAI API
     *
     * @param string $dishName The name of the dish
     * @return array The generated recipe
     */
    public function generateRecipe($dishName)
    {
        $prompt = "Generate a recipe for $dishName. The recipe should include:
            1. A title for the dish
            2. A list of ingredients (please list them one by one without measurements)
            3. Step-by-step cooking instructions
            4. Approximate cooking time
            5. Difficulty level (Easy, Intermediate, or Advanced)

            Format the response as a JSON object with the following keys:
            - title (string)
            - ingredients (array of strings)
            - instructions (string with numbered steps)
            - cookingTime (string)
            - difficulty (string)

            Make sure the recipe is for European cuisine.";

        $response = $this->callOpenAiApi($prompt);
        
        if (!$response) {
            return $this->getFallbackRecipe($dishName);
        }
        
        try {
            $content = $response['choices'][0]['message']['content'];
            $recipe = Json::decode($content);
            return $recipe;
        } catch (\Exception $e) {
            Yii::error('Error parsing OpenAI response: ' . $e->getMessage());
            return $this->getFallbackRecipe($dishName);
        }
    }
    
    /**
     * Call the OpenAI API
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
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode != 200) {
            Yii::error('OpenAI API error: ' . $response);
            return false;
        }
        
        return Json::decode($response);
    }
    
    /**
     * Get a fallback recipe if the OpenAI API call fails
     *
     * @param string $dishName The name of the dish
     * @return array A basic recipe
     */
    private function getFallbackRecipe($dishName)
    {
        return [
            'title' => "European $dishName",
            'ingredients' => ['olive oil', 'garlic', 'onions', 'salt', 'pepper', 'herbs'],
            'instructions' => "1. Prepare all ingredients by washing and chopping as needed.\n\n2. Heat olive oil in a large pan over medium heat.\n\n3. Add garlic and onions, cooking until fragrant and translucent.\n\n4. Add remaining ingredients and cook according to traditional methods.\n\n5. Season with salt, pepper, and fresh herbs to taste.\n\n6. Serve hot and enjoy your homemade dish.",
            'cookingTime' => '45 minutes',
            'difficulty' => 'Varies'
        ];
    }
}
