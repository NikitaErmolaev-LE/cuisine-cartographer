
import { supabase } from "@/integrations/supabase/client";

// Function to search products from Supabase database
export const api = {
  async searchProducts(ingredients) {
    try {
      // Convert ingredients array to lowercase and remove any weight information
      const cleanedIngredients = ingredients.map(ingredient => {
        // Remove weight information (numbers followed by units like g, kg, oz, lb, etc.)
        return ingredient
          .toLowerCase()
          .replace(/\d+\s*(g|kg|ml|l|oz|lb|tbsp|tsp|cup|cups|piece|pieces)\b/gi, '')
          .trim();
      });
      
      // If no ingredients, return empty array
      if (cleanedIngredients.length === 0) {
        return [];
      }
      
      console.log("Searching for ingredients:", cleanedIngredients);
      
      // Use a simpler, more reliable approach
      // Search for each ingredient individually and combine results
      const allProducts = [];
      
      for (const ingredient of cleanedIngredients) {
        console.log(`Searching for: ${ingredient}`);
        const { data: ingredientProducts, error: ingredientError } = await supabase
          .from('product')
          .select('*')
          .ilike('title', `%${ingredient}%`);
          
        if (ingredientError) {
          console.error('Error searching for ingredient:', ingredient, ingredientError);
        } else if (ingredientProducts) {
          console.log(`Found ${ingredientProducts.length} products for: ${ingredient}`);
          allProducts.push(...ingredientProducts);
        }
      }
      
      // Remove duplicates by ID
      const uniqueProductIds = new Set();
      const products = allProducts.filter(product => {
        if (uniqueProductIds.has(product.id)) {
          return false;
        }
        uniqueProductIds.add(product.id);
        return true;
      });
      
      console.log(`Found ${products.length} unique products for all ingredients`);
      
      // Transform the data to match the expected format in the application
      const formattedProducts = (products || []).map(product => ({
        id: product.id,
        title: product.title,
        price: parseFloat(product.price.toString()), // Convert to string first to fix TS error
        description: `${product.title} - Quality ingredient`,
        imageUrl: product.image || '/placeholder.svg'
      }));
      
      // If no products found, return some default products
      if (formattedProducts.length === 0) {
        console.log('No matching products found for ingredients:', ingredients);
        
        // Get some random products as fallback
        const { data: randomProducts, error: randomError } = await supabase
          .from('product')
          .select('*')
          .limit(5);
          
        if (randomError) {
          console.error('Error fetching random products:', randomError);
          return [];
        }
        
        return randomProducts.map(product => ({
          id: product.id,
          title: product.title,
          price: parseFloat(product.price.toString()), // Convert to string first to fix TS error
          description: `${product.title} - Quality ingredient`,
          imageUrl: product.image || '/placeholder.svg'
        }));
      }
      
      return formattedProducts;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};
