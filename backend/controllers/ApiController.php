<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use app\models\Product;
use app\components\GeminiService;

class ApiController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'contentNegotiator' => [
                'class' => ContentNegotiator::class,
                'formats' => [
                    'application/json' => Response::FORMAT_JSON,
                ],
            ],
            'corsFilter' => [
                'class' => Cors::class,
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                ],
            ],
        ];
    }

    /**
     * Search for products based on ingredients
     *
     * @return array
     */
    public function actionSearchProducts()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        $ingredients = Yii::$app->request->get('ingredients', '');
        $ingredientsArray = explode(',', $ingredients);
        
        $query = Product::find();
        
        // If ingredients are provided, filter products
        if (!empty($ingredientsArray)) {
            $query->where(['like', 'title', $ingredientsArray[0]]);
            
            for ($i = 1; $i < count($ingredientsArray); $i++) {
                $query->orWhere(['like', 'title', $ingredientsArray[$i]]);
            }
        }
        
        $products = $query->all();
        return $products;
    }

    /**
     * Generate a recipe using Gemini
     *
     * @return array
     */
    public function actionGenerateRecipe()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        // Get POST data
        $request = Yii::$app->request;
        $post = $request->post();
        $dishName = isset($post['dishName']) ? $post['dishName'] : '';
        
        // If POST is empty, try to get JSON input
        if (empty($post)) {
            $jsonInput = file_get_contents('php://input');
            if (!empty($jsonInput)) {
                $data = json_decode($jsonInput, true);
                $dishName = isset($data['dishName']) ? $data['dishName'] : '';
            }
        }
        
        if (empty($dishName)) {
            return [
                'success' => false,
                'message' => 'Dish name is required',
            ];
        }
        
        Yii::info("Generating recipe for dish: $dishName");
        
        $geminiService = new GeminiService();
        $recipe = $geminiService->generateRecipe($dishName);
        
        if (!$recipe) {
            Yii::error("Failed to generate recipe for: $dishName");
            return [
                'success' => false,
                'message' => 'Failed to generate recipe',
            ];
        }
        
        return [
            'success' => true,
            'recipe' => $recipe,
        ];
    }
}
