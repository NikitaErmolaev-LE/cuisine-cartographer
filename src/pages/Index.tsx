
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { toast } from 'sonner';
import { openai } from '@/services/openai';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      const generatedRecipe = await openai.generateRecipe(query);
      if (!generatedRecipe || typeof generatedRecipe !== 'object') {
        throw new Error('Invalid recipe data');
      }
      
      const ingredients = (generatedRecipe as Recipe).ingredients;
      const foundProducts = await api.searchProducts(ingredients);
      
      setRecipe(generatedRecipe as Recipe);
      setProducts(foundProducts as Product[]);
      
      toast.success('Recipe found!', {
        description: `Found ${foundProducts.length} ingredients for ${(generatedRecipe as Recipe).title}`
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
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`Added ${product.title} to cart!`);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen">
      <div className="container px-4 py-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <h3 className="font-medium mb-4">Shopping Cart</h3>
              {cartItems.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
