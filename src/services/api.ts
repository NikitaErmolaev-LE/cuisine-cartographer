
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
      
      // Search for products that match any of the ingredients
      // Using individual queries instead of combining with OR to avoid syntax issues
      let query = supabase.from('product').select('*');
      
      // Add filters for each ingredient (using ilike for case-insensitive search)
      if (cleanedIngredients.length > 0) {
        // Start with the first ingredient
        query = query.ilike('title', `%${cleanedIngredients[0]}%`);
        
        // Add additional ingredients with or conditions
        for (let i = 1; i < cleanedIngredients.length; i++) {
          query = query.or(`title.ilike.%${cleanedIngredients[i]}%`);
        }
      }
      
      // Execute the query
      const { data: products, error } = await query;
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      // Transform the data to match the expected format in the application
      const formattedProducts = products.map(product => ({
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
