
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { toast } from 'sonner';
import { openai } from '@/services/openai';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface Recipe {
  title: string;
  instructions: string;
  cookingTime: string;
  difficulty: string;
  ingredients: string[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      // Generate recipe with OpenAI
      const generatedRecipe = await openai.generateRecipe(query);
      
      // Get products from our database (or mock API in this case)
      const ingredients = generatedRecipe.ingredients;
      const foundProducts = await api.searchProducts(ingredients);
      
      // Update state with results
      setRecipe(generatedRecipe);
      setProducts(foundProducts);
      
      toast.success('Recipe found!', {
        description: `Found ${foundProducts.length} ingredients for ${generatedRecipe.title}`
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Failed to search', {
        description: 'Please try again with a different term.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    toast.success(`Added ${product.title} to cart!`);
  };

  return (
    <div className="min-h-screen">
      <main className="container px-4 py-8">
        <SearchBar className="mt-8" onSearch={handleSearch} isLoading={isLoading} />
        
        {recipe && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-medium mb-4">{recipe.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-muted px-2 py-1 rounded-full text-sm">
                  {recipe.cookingTime}
                </span>
                <span className="bg-muted px-2 py-1 rounded-full text-sm">
                  {recipe.difficulty}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Instructions</h3>
                  <div className="text-sm text-muted-foreground">
                    {recipe.instructions.split('\n').map((step, index) => (
                      <p key={index} className="mb-2">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-8 mb-4">
              Products for {recipe.title}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="object-cover h-full w-full"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium truncate" title={product.title}>
                      {product.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
