
// This connects to our backend which then calls OpenAI

export const openai = {
  async generateRecipe(dishName) {
    try {
      // Call the Yii2 backend API which connects to OpenAI
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishName }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to generate recipe');
      }
      
      return data.recipe;
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new Error('Failed to generate recipe');
    }
  }
};
