
// This file would normally connect to our backend which then calls OpenAI
// For now, we'll use a mock implementation to avoid connection issues

export const openai = {
  async generateRecipe(dishName) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
  
  if (dishNameLower.includes('ratatouille')) {
    return {
      title: "Traditional French Ratatouille",
      ingredients: ["eggplant", "zucchini", "bell peppers", "tomatoes", "onions", "garlic", "olive oil", "herbs de provence", "thyme", "bay leaf"],
      instructions: "1. Cut eggplant, zucchini, and bell peppers into 1-inch cubes. Slice onions and mince garlic.\n\n2. Salt the eggplant and let sit for 30 minutes to remove bitterness, then pat dry.\n\n3. In a large pot, heat olive oil and sauté onions until translucent.\n\n4. Add garlic and cook for another minute.\n\n5. Add bell peppers and cook for 5 minutes until slightly softened.\n\n6. Add eggplant and zucchini, cooking for another 5 minutes.\n\n7. Add tomatoes, herbs de provence, thyme, and bay leaf. Season with salt and pepper.\n\n8. Simmer on low heat for 30-45 minutes, stirring occasionally.\n\n9. Taste and adjust seasoning. Serve hot or at room temperature.",
      cookingTime: "1.5 hours",
      difficulty: "Intermediate"
    };
  }
  
  if (dishNameLower.includes('paella')) {
    return {
      title: "Spanish Seafood Paella",
      ingredients: ["arborio rice", "saffron", "onions", "garlic", "bell peppers", "tomatoes", "seafood mix", "chicken stock", "white wine", "lemon", "peas", "olive oil", "paprika"],
      instructions: "1. In a large paella pan, heat olive oil and sauté finely chopped onions, garlic, and bell peppers until soft.\n\n2. Add diced tomatoes and cook for a few minutes until they break down.\n\n3. Stir in rice and saffron, coating in the oil and vegetable mixture.\n\n4. Pour in white wine and let it absorb completely.\n\n5. Add hot chicken stock and paprika. Stir once, then do not stir again.\n\n6. Arrange seafood on top of the rice. Cook for about 20 minutes until rice is almost done.\n\n7. Add frozen peas and cover with foil. Let rest for 5-10 minutes.\n\n8. Garnish with lemon wedges and serve directly from the pan.",
      cookingTime: "45 minutes",
      difficulty: "Intermediate"
    };
  }
  
  if (dishNameLower.includes('boef') || dishNameLower.includes('bourguignon') || dishNameLower.includes('beef stew')) {
    return {
      title: "Boeuf Bourguignon",
      ingredients: ["beef chuck", "bacon", "onions", "carrots", "garlic", "red wine", "beef stock", "tomato paste", "thyme", "bay leaves", "mushrooms", "pearl onions", "butter", "flour"],
      instructions: "1. Cut beef into 2-inch cubes and dry thoroughly with paper towels.\n\n2. In a large Dutch oven, cook bacon until crispy, then remove and set aside.\n\n3. Brown beef in batches in the bacon fat. Remove and set aside.\n\n4. In the same pot, sauté chopped onions and sliced carrots until softened.\n\n5. Add minced garlic and cook for another minute.\n\n6. Add tomato paste and stir for 1-2 minutes.\n\n7. Sprinkle flour over vegetables and stir to coat.\n\n8. Return beef and bacon to the pot. Add red wine, beef stock, thyme, and bay leaves.\n\n9. Bring to a simmer, then cover and transfer to a 325°F oven for 2-3 hours until beef is tender.\n\n10. While stew is cooking, sauté mushrooms and pearl onions in butter until browned.\n\n11. Add mushrooms and pearl onions to the stew for the last 30 minutes of cooking.\n\n12. Season with salt and pepper to taste before serving.",
      cookingTime: "3-4 hours",
      difficulty: "Intermediate"
    };
  }
  
  // Default recipe for any other dish
  return {
    title: `European ${dishName}`,
    ingredients: ["olive oil", "garlic", "onions", "fresh herbs", "salt", "pepper", "seasonal vegetables", "quality protein"],
    instructions: "1. Prepare all ingredients by washing and chopping as needed.\n\n2. Heat olive oil in a large pan over medium heat.\n\n3. Add garlic and onions, cooking until fragrant and translucent.\n\n4. Add protein and cook until browned on all sides.\n\n5. Incorporate seasonal vegetables and cook until they begin to soften.\n\n6. Season with salt, pepper, and fresh herbs to taste.\n\n7. Continue cooking until all ingredients are properly done.\n\n8. Serve hot and enjoy your homemade European dish.",
    cookingTime: "45 minutes",
    difficulty: "Intermediate"
  };
}
