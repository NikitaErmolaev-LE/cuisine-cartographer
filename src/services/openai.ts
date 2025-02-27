
// This would connect to your OpenAI API

export const openai = {
  async generateRecipe(dishName) {
    try {
      // In a real implementation, you would call your backend which then calls OpenAI
      // For example:
      // return await fetch('/api/generate-recipe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ dishName })
      // }).then(res => res.json())
      
      // For demo purposes, we'll return mock data based on the dish name
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return mock recipe data based on the dish name
      return getMockRecipe(dishName);
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new Error('Failed to generate recipe');
    }
  }
};

// Mock recipes for demonstration
function getMockRecipe(dishName) {
  const dishNameLower = dishName.toLowerCase();
  
  if (dishNameLower.includes('pasta') || dishNameLower.includes('spaghetti')) {
    return {
      title: "Classic Spaghetti with Tomato Sauce",
      ingredients: ["spaghetti", "tomatoes", "garlic", "olive oil", "basil", "onions", "parmesan"],
      instructions: "1. Bring a large pot of salted water to a boil and cook spaghetti according to package instructions.\n\n2. In a large pan, heat olive oil and sauté finely chopped onions and garlic until translucent.\n\n3. Add chopped tomatoes and simmer for 20 minutes until the sauce thickens.\n\n4. Stir in fresh basil leaves and season with salt and pepper.\n\n5. Drain the pasta and toss with the sauce.\n\n6. Serve hot with grated Parmesan cheese on top.",
      cookingTime: "30 minutes",
      difficulty: "Easy"
    };
  }
  
  if (dishNameLower.includes('risotto')) {
    return {
      title: "Creamy Mushroom Risotto",
      ingredients: ["arborio rice", "mushrooms", "onions", "garlic", "white wine", "vegetable stock", "butter", "parmesan"],
      instructions: "1. In a large pan, heat olive oil and sauté finely chopped onions and garlic until soft.\n\n2. Add sliced mushrooms and cook until they release their moisture and begin to brown.\n\n3. Add Arborio rice and stir for 1-2 minutes until translucent around the edges.\n\n4. Pour in white wine and stir until absorbed.\n\n5. Gradually add hot vegetable stock, one ladle at a time, stirring continuously and waiting for each addition to be absorbed before adding more.\n\n6. After about 18-20 minutes, when rice is creamy but still has a slight bite, remove from heat.\n\n7. Stir in butter and grated Parmesan cheese. Season with salt and pepper.\n\n8. Let rest for 2 minutes before serving.",
      cookingTime: "40 minutes",
      difficulty: "Intermediate"
    };
  }
  
  if (dishNameLower.includes('pizza')) {
    return {
      title: "Classic Margherita Pizza",
      ingredients: ["flour", "yeast", "olive oil", "tomatoes", "mozzarella", "basil"],
      instructions: "1. Prepare the dough by mixing flour, yeast, salt, water, and olive oil. Knead until smooth and elastic.\n\n2. Let the dough rise in a warm place for 1-2 hours until doubled in size.\n\n3. Preheat your oven to its highest setting (ideally 500°F/260°C) with a pizza stone or baking sheet inside.\n\n4. Stretch the dough into a circle and place on a floured surface.\n\n5. Spread a thin layer of tomato sauce over the dough, leaving a small border around the edge.\n\n6. Tear fresh mozzarella into pieces and distribute evenly over the sauce.\n\n7. Bake for 8-10 minutes until the crust is golden and the cheese is bubbling.\n\n8. Remove from oven and immediately add fresh basil leaves and a drizzle of olive oil.\n\n9. Slice and serve hot.",
      cookingTime: "2.5 hours (including rising time)",
      difficulty: "Intermediate"
    };
  }
  
  // Default recipe for any other dish
  return {
    title: `European ${dishName}`,
    ingredients: ["olive oil", "garlic", "onions", "salt", "pepper", "herbs"],
    instructions: "1. Prepare all ingredients by washing and chopping as needed.\n\n2. Heat olive oil in a large pan over medium heat.\n\n3. Add garlic and onions, cooking until fragrant and translucent.\n\n4. Add remaining ingredients and cook according to traditional methods.\n\n5. Season with salt, pepper, and fresh herbs to taste.\n\n6. Serve hot and enjoy your homemade dish.",
    cookingTime: "45 minutes",
    difficulty: "Varies"
  };
}
