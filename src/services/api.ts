
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
      
      // Start the query
      let query = supabase.from('product').select('*');
      
      // For the first ingredient, add it to the query
      if (cleanedIngredients.length > 0) {
        // Use ilike for case-insensitive search
        query = query.ilike('title', `%${cleanedIngredients[0]}%`);
        
        // For each additional ingredient, add an OR condition
        for (let i = 1; i < cleanedIngredients.length; i++) {
          // Use proper syntax for OR condition with Supabase
          query = query.or(`title.ilike.%${cleanedIngredients[i]}%`);
        }
      }
      
      // Execute the query
      let { data: products, error } = await query;
      
      if (error) {
        console.error('Supabase query error:', error);
        
        // Try a simpler approach if the complex query fails
        // Search for each ingredient individually and combine results
        const allProducts = [];
        
        for (const ingredient of cleanedIngredients) {
          const { data: ingredientProducts, error: ingredientError } = await supabase
            .from('product')
            .select('*')
            .ilike('title', `%${ingredient}%`);
            
          if (!ingredientError && ingredientProducts) {
            allProducts.push(...ingredientProducts);
          }
        }
        
        // Remove duplicates by ID
        const uniqueProductIds = new Set();
        products = allProducts.filter(product => {
          if (uniqueProductIds.has(product.id)) {
            return false;
          }
          uniqueProductIds.add(product.id);
          return true;
        });
      }
      
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
