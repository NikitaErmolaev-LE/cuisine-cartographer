
// Real implementation of OpenAI service using the backend API

export const openai = {
  async generateRecipe(dishName: string) {
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishName }),
      });
      
      if (!response.ok) {
        console.error('Error from backend:', response.status);
        throw new Error('Failed to generate recipe');
      }
      
      const data = await response.json();
      
      if (!data.success || !data.recipe) {
        console.error('Invalid response from backend:', data);
        throw new Error('Failed to generate recipe');
      }
      
      return data.recipe;
    } catch (error) {
      console.error('Error generating recipe:', error);
      // Return a fallback recipe in case of error
      return {
        title: `${dishName}`,
        ingredients: ["Could not generate ingredients - API error"],
        instructions: "Could not generate instructions - please try again later.",
        cookingTime: "Unknown",
        difficulty: "Unknown"
      };
    }
  }
};
