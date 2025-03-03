
import { toast } from "sonner";

// Default recipe when API is unavailable
const defaultRecipe = {
  title: "Pasta Carbonara",
  ingredients: [
    "Main ingredient for carbonara",
    "2 tablespoons olive oil",
    "1 onion, diced",
    "2 cloves garlic, minced",
    "1 teaspoon mixed herbs",
    "Salt and pepper to taste"
  ],
  instructions: "1. Cook the main ingredient according to package instructions.\n2. In a pan, heat olive oil and sauté onion until translucent.\n3. Add garlic and continue to sauté for another minute.\n4. Add the mixed herbs and seasoning.\n5. Combine with the cooked main ingredient.\n6. Serve hot and enjoy!",
  cookingTime: "25 minutes",
  difficulty: "Easy"
};

export const openai = {
  async generateRecipe(dishName: string) {
    console.log("Generating recipe for:", dishName);
    
    // Clean up the input
    const cleanDishName = dishName.trim().replace(/\\+$/, '');
    
    try {
      // Update API URL to include the full path to the backend
      const apiUrl = '/index.php?r=api/generate-recipe';
      console.log("Calling API endpoint:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishName: cleanDishName }),
      });
      
      if (!response.ok) {
        console.error('Error from backend:', response.status, response.statusText);
        throw new Error(`Failed to generate recipe: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.recipe) {
        return data.recipe;
      } else {
        console.error('Invalid response format:', data);
        throw new Error(`Invalid response from API: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      
      // Show toast with error message
      toast.error('Failed to generate recipe', {
        description: 'Using a fallback recipe instead.'
      });
      
      // Use fallback recipe when API fails
      console.log('Using fallback recipe generator for:', cleanDishName);
      return {
        ...defaultRecipe,
        title: `${cleanDishName.charAt(0).toUpperCase() + cleanDishName.slice(1)} Dish`,
      };
    }
  }
};
