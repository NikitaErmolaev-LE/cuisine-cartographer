
<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use app\models\Product;
use app\components\OpenAiService;

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
     * Generate a recipe using OpenAI
     *
     * @return array
     */
    public function actionGenerateRecipe()
    {
        $dishName = Yii::$app->request->post('dishName', '');
        
        if (empty($dishName)) {
            return [
                'success' => false,
                'message' => 'Dish name is required',
            ];
        }
        
        $openAiService = new OpenAiService();
        $recipe = $openAiService->generateRecipe($dishName);
        
        return [
            'success' => true,
            'recipe' => $recipe,
        ];
    }
}
