
import { supabase } from "@/integrations/supabase/client";

// Function to search products from Supabase database
export const api = {
  async searchProducts(ingredients) {
    try {
      // If no ingredients, return empty array
      if (!ingredients || ingredients.length === 0) {
        return [];
      }
      
      // Clean up ingredients removing weight information and sanitize input
      const cleanedIngredients = ingredients.map(ingredient => {
        return ingredient
          .toLowerCase()
          .replace(/\d+\s*(g|kg|ml|l|oz|lb|tbsp|tsp|cup|cups|piece|pieces)\b/gi, '')
          .replace(/\\+$/, '')
          .trim();
      });
      
      console.log("Searching for ingredients:", cleanedIngredients);
      
      // Search for each ingredient individually for better reliability
      const allProducts = [];
      
      for (const ingredient of cleanedIngredients) {
        // Skip very short ingredient names to avoid too broad searches
        if (ingredient.length < 3) continue;
        
        // Extract the main ingredient name (first word, or first two for compound ingredients)
        const words = ingredient.split(' ');
        const searchTerm = words.length > 1 && words[0].length > 2 ? 
          words.slice(0, 2).join(' ') : words[0];
          
        console.log(`Searching for: ${searchTerm}`);
        
        try {
          // Limit the search to 3 products per ingredient to avoid overwhelming results
          const { data: ingredientProducts, error: ingredientError } = await supabase
            .from('product')
            .select('*')
            .ilike('title', `%${searchTerm}%`)
            .limit(3);
            
          if (ingredientError) {
            console.error('Error searching for ingredient:', searchTerm, ingredientError);
          } else if (ingredientProducts && ingredientProducts.length > 0) {
            console.log(`Found ${ingredientProducts.length} products for: ${searchTerm}`);
            allProducts.push(...ingredientProducts);
          }
        } catch (searchError) {
          console.error(`Error in individual search for ${searchTerm}:`, searchError);
        }
      }
      
      // Remove duplicates by ID
      const uniqueProductIds = new Set();
      const products = allProducts.filter(product => {
        if (!product || uniqueProductIds.has(product.id)) {
          return false;
        }
        uniqueProductIds.add(product.id);
        return true;
      });
      
      console.log(`Found ${products.length} unique products for all ingredients`);
      
      // Transform the data to match the expected format
      const formattedProducts = products.map(product => ({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price.toString()),
        description: `${product.title} - Quality ingredient`,
        imageUrl: product.image || '/placeholder.svg'
      }));
      
      // If no products found, return some default products
      if (formattedProducts.length === 0) {
        console.log('No matching products found for ingredients:', ingredients);
        
        try {
          // Get random products from the database as fallback
          const { data: randomProducts, error: randomError } = await supabase
            .from('product')
            .select('*')
            .limit(5);
            
          if (randomError) {
            console.error('Error fetching random products:', randomError);
            return [];
          }
          
          if (randomProducts && randomProducts.length > 0) {
            console.log(`Falling back to ${randomProducts.length} random products`);
            return randomProducts.map(product => ({
              id: product.id,
              title: product.title,
              price: parseFloat(product.price.toString()),
              description: `${product.title} - Quality ingredient`,
              imageUrl: product.image || '/placeholder.svg'
            }));
          }
        } catch (fallbackError) {
          console.error('Error in fallback product fetch:', fallbackError);
        }
      }
      
      return formattedProducts;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};
