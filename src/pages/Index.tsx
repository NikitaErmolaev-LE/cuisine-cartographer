
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import RecipeDisplay from '@/components/RecipeDisplay';
import ProductGrid from '@/components/ProductGrid';
import { api } from '@/services/api';
import { openai } from '@/services/openai';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [products, setProducts] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    
    try {
      // Generate recipe with OpenAI
      const generatedRecipe = await openai.generateRecipe(query);
      
      // Get products from our database (or mock API in this case)
      const ingredients = generatedRecipe.ingredients;
      const foundProducts = await api.searchProducts(ingredients);
      
      // Update state with results
      setRecipe({
        title: generatedRecipe.title,
        instructions: generatedRecipe.instructions,
        cookingTime: generatedRecipe.cookingTime,
        difficulty: generatedRecipe.difficulty
      });
      
      setProducts(foundProducts);
      
      // Show success toast
      toast.success('Recipe found!', {
        description: `Found ${foundProducts.length} ingredients for ${generatedRecipe.title}`
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Failed to generate recipe', {
        description: 'Please try again with a different dish.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-4 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Discover European Cuisine
          </h1>
          <p className="text-muted-foreground text-lg">
            Search for any European dish and we'll find the recipe and ingredients for you
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {recipe && (
          <>
            <RecipeDisplay recipe={recipe} />
            <ProductGrid 
              products={products} 
              title={`Ingredients for ${recipe.title}`} 
            />
          </>
        )}
        
        {!recipe && !isLoading && (
          <div className="mt-20 text-center text-muted-foreground animate-fade-in">
            <p>Search for a European dish to get started</p>
            <p className="text-sm mt-2">Try "Spaghetti Carbonara", "Risotto", or "Pizza"</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
