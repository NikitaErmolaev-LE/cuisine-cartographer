
// Real implementation of OpenAI service using the backend API

export const openai = {
  async generateRecipe(dishName: string) {
    try {
      // Update the API URL to include the full path to the backend endpoint
      const backendUrl = import.meta.env.PROD 
        ? '/backend/web/api/generate-recipe' 
        : '/api/generate-recipe';
        
      console.log(`Calling API endpoint: ${backendUrl}`);
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dishName }),
      });
      
      if (!response.ok) {
        console.error('Error from backend:', response.status, response.statusText);
        throw new Error(`Failed to generate recipe: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API response:", data);
      
      if (!data.success || !data.recipe) {
        console.error('Invalid response from backend:', data);
        throw new Error('Failed to generate recipe: Invalid response format');
      }
      
      return data.recipe;
    } catch (error) {
      console.error('Error generating recipe:', error);
      
      // Provide a fallback recipe generator for when the API fails
      console.log('Using fallback recipe generator for:', dishName);
      return generateFallbackRecipe(dishName);
    }
  }
};

// Fallback recipe generator for when the API connection fails
function generateFallbackRecipe(dishName: string): any {
  const lowercaseDish = dishName.toLowerCase();
  let cookingTime, difficulty, ingredients, instructions;
  
  // Determine dish type based on name
  const isDessert = /cake|pie|cookie|dessert|sweet|ice cream|pudding|brownie/.test(lowercaseDish);
  const isSoup = /soup|stew|broth|chowder/.test(lowercaseDish);
  const isSalad = /salad|slaw/.test(lowercaseDish);
  const isSandwich = /sandwich|burger|wrap|sub|panini/.test(lowercaseDish);
  const isPasta = /pasta|spaghetti|linguine|fettuccine|macaroni|lasagna|noodle/.test(lowercaseDish);
  const isMeat = /steak|chicken|beef|pork|lamb|turkey|meat|fish|seafood/.test(lowercaseDish);
  
  // Generate base ingredients based on dish type
  if (isDessert) {
    ingredients = [
      "2 cups all-purpose flour", 
      "1 cup sugar", 
      "1/2 cup butter", 
      "2 eggs", 
      "1 teaspoon vanilla extract",
      "1/2 teaspoon baking powder",
      "1/4 teaspoon salt"
    ];
    cookingTime = "45 minutes";
    difficulty = "Intermediate";
    instructions = "1. Preheat oven to 350°F (175°C).\n2. Mix dry ingredients in a bowl.\n3. Cream butter and sugar, then add eggs and vanilla.\n4. Combine wet and dry ingredients.\n5. Pour into prepared pan and bake for 30-35 minutes until golden.";
  } else if (isSoup) {
    ingredients = [
      "1 onion, diced", 
      "2 carrots, diced", 
      "2 celery stalks, diced", 
      "2 cloves garlic, minced", 
      "6 cups vegetable or chicken broth",
      "1 bay leaf",
      "Salt and pepper to taste"
    ];
    cookingTime = "30 minutes";
    difficulty = "Easy";
    instructions = "1. Sauté onion, carrots, and celery in a large pot until soft.\n2. Add garlic and cook for 1 minute.\n3. Pour in broth and add bay leaf.\n4. Bring to a boil, then reduce heat and simmer for 20 minutes.\n5. Season with salt and pepper before serving.";
  } else if (isSalad) {
    ingredients = [
      "4 cups mixed greens", 
      "1 cucumber, sliced", 
      "1 tomato, diced", 
      "1/4 red onion, thinly sliced", 
      "1/4 cup olive oil",
      "2 tablespoons vinegar",
      "Salt and pepper to taste"
    ];
    cookingTime = "15 minutes";
    difficulty = "Easy";
    instructions = "1. Wash and dry all vegetables.\n2. Combine greens, cucumber, tomato, and onion in a large bowl.\n3. Whisk together olive oil, vinegar, salt, and pepper.\n4. Drizzle dressing over salad and toss to combine.";
  } else if (isSandwich) {
    ingredients = [
      "2 slices bread", 
      "2 slices cheese", 
      "2 slices deli meat", 
      "Lettuce leaves", 
      "Tomato slices",
      "Mayonnaise and/or mustard",
      "Salt and pepper to taste"
    ];
    cookingTime = "10 minutes";
    difficulty = "Easy";
    instructions = "1. Spread condiments on bread slices.\n2. Layer cheese, meat, lettuce, and tomato on one slice.\n3. Season with salt and pepper if desired.\n4. Top with second bread slice and cut in half if desired.";
  } else if (isPasta) {
    ingredients = [
      "8 oz pasta", 
      "2 tablespoons olive oil", 
      "2 cloves garlic, minced", 
      "1 can (14 oz) crushed tomatoes", 
      "1/4 cup grated Parmesan cheese",
      "Fresh basil leaves",
      "Salt and pepper to taste"
    ];
    cookingTime = "25 minutes";
    difficulty = "Easy";
    instructions = "1. Cook pasta according to package directions.\n2. Heat olive oil in a pan and sauté garlic until fragrant.\n3. Add crushed tomatoes and simmer for 10 minutes.\n4. Drain pasta and toss with sauce.\n5. Garnish with Parmesan and basil before serving.";
  } else if (isMeat) {
    ingredients = [
      "1 lb meat (chicken, beef, etc.)", 
      "2 tablespoons olive oil", 
      "2 cloves garlic, minced", 
      "1 teaspoon dried herbs", 
      "1 lemon, juiced",
      "Salt and pepper to taste"
    ];
    cookingTime = "35 minutes";
    difficulty = "Intermediate";
    instructions = "1. Preheat oven to 375°F (190°C).\n2. Season meat with salt, pepper, and herbs.\n3. Heat oil in a pan and sear meat on all sides.\n4. Transfer to oven and cook until desired doneness is reached.\n5. Let rest for 5 minutes before slicing and serving.";
  } else {
    // Generic recipe for anything else
    ingredients = [
      "Main ingredient for " + dishName,
      "2 tablespoons olive oil", 
      "1 onion, diced", 
      "2 cloves garlic, minced", 
      "1 teaspoon mixed herbs",
      "Salt and pepper to taste"
    ];
    cookingTime = "30 minutes";
    difficulty = "Intermediate";
    instructions = "1. Prepare all ingredients.\n2. Heat oil in a pan and sauté onion and garlic.\n3. Add main ingredients and cook until done.\n4. Season with herbs, salt, and pepper.\n5. Serve hot and enjoy!";
  }
  
  // Add specific ingredients based on dish name
  const dishWords = dishName.toLowerCase().split(' ');
  dishWords.forEach(word => {
    if (word.length > 3 && !ingredients.some(i => i.toLowerCase().includes(word))) {
      // Add the ingredient if it's not already in the list
      ingredients.push(`1 cup ${word}`);
    }
  });
  
  return {
    title: `${dishName.charAt(0).toUpperCase() + dishName.slice(1)}`,
    ingredients: ingredients,
    instructions: instructions,
    cookingTime: cookingTime,
    difficulty: difficulty
  };
}
