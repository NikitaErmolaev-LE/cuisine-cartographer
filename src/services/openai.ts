
// Mock implementation of OpenAI service

const mockRecipes = {
  "spaghetti carbonara": {
    title: "Classic Spaghetti Carbonara",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Freshly ground black pepper",
      "Salt"
    ],
    instructions: "1. Bring a large pot of salted water to boil and cook spaghetti according to package instructions.\n2. While pasta cooks, heat a large skillet over medium heat. Add the pancetta and cook until crispy, about 7-8 minutes.\n3. In a bowl, whisk together eggs, grated cheeses, and pepper.\n4. When pasta is al dente, reserve 1 cup of pasta water, then drain.\n5. Working quickly, add hot pasta to the skillet with pancetta. Remove from heat.\n6. Add the egg and cheese mixture, stirring constantly. Add splash of pasta water if needed to create a creamy sauce.\n7. Serve immediately with extra grated cheese and black pepper.",
    cookingTime: "25 minutes",
    difficulty: "Intermediate"
  },
  "pizza margherita": {
    title: "Authentic Pizza Margherita",
    ingredients: [
      "500g pizza dough",
      "400g San Marzano tomatoes, crushed",
      "250g fresh mozzarella cheese, sliced",
      "Fresh basil leaves",
      "2 tbsp extra virgin olive oil",
      "Salt and pepper to taste",
      "1 tsp dried oregano (optional)"
    ],
    instructions: "1. Preheat oven to highest temperature (usually 500-550°F/260-290°C) with pizza stone or steel if available.\n2. Stretch pizza dough into a 12-inch circle on floured surface.\n3. Spread crushed tomatoes evenly over dough, leaving a border for the crust.\n4. Arrange mozzarella slices on top.\n5. Bake for 8-10 minutes until crust is golden and cheese is bubbly.\n6. Remove from oven, sprinkle with fresh basil leaves, drizzle with olive oil, and season with salt and pepper.\n7. Slice and serve immediately.",
    cookingTime: "20 minutes",
    difficulty: "Intermediate"
  },
  "tiramisu": {
    title: "Classic Italian Tiramisu",
    ingredients: [
      "6 egg yolks",
      "3/4 cup white sugar",
      "2/3 cup milk",
      "1 1/4 cups heavy cream",
      "1/2 teaspoon vanilla extract",
      "1 pound mascarpone cheese",
      "1/4 cup strong brewed coffee, cooled",
      "2 tablespoons rum",
      "2 packages ladyfinger cookies",
      "1 tablespoon unsweetened cocoa powder"
    ],
    instructions: "1. In a medium saucepan, whisk together egg yolks and sugar until well blended. Whisk in milk and cook over medium heat, stirring constantly, until mixture boils. Boil gently for 1 minute, remove from heat and allow to cool slightly. Cover tightly and chill in refrigerator 1 hour.\n2. In a medium bowl, beat cream with vanilla until stiff peaks form.\n3. Whisk mascarpone into yolk mixture until smooth.\n4. In a small bowl, combine coffee and rum. Split ladyfingers in half lengthwise and drizzle with coffee mixture.\n5. Arrange half of soaked ladyfingers in bottom of a 7x11 inch dish. Spread half of mascarpone mixture over ladyfingers, then half of whipped cream over that. Repeat layers.\n6. Sprinkle with cocoa. Cover and refrigerate 4-6 hours, until set.",
    cookingTime: "30 minutes (plus 4-6 hours chilling)",
    difficulty: "Intermediate"
  },
  "risotto": {
    title: "Creamy Mushroom Risotto",
    ingredients: [
      "1.5L vegetable or chicken stock",
      "2 tbsp olive oil",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "300g Arborio rice",
      "150ml dry white wine",
      "300g mixed mushrooms, sliced",
      "50g butter",
      "50g Parmesan cheese, grated",
      "Salt and pepper to taste",
      "Fresh parsley, chopped"
    ],
    instructions: "1. Heat stock in a saucepan and keep at a gentle simmer.\n2. In a large pan, heat olive oil and sauté onion until soft.\n3. Add garlic and cook for 1 minute more.\n4. Add rice and stir for 1-2 minutes until translucent.\n5. Pour in wine and stir until absorbed.\n6. Add mushrooms and cook for 2 minutes.\n7. Add hot stock one ladle at a time, stirring continuously and waiting until each addition is absorbed before adding more.\n8. Continue for about 18-20 minutes until rice is creamy but still has slight bite.\n9. Remove from heat, stir in butter and Parmesan, cover and rest for 2 minutes.\n10. Season with salt and pepper, garnish with parsley, and serve with extra Parmesan.",
    cookingTime: "40 minutes",
    difficulty: "Intermediate"
  },
  "reuben sandwich": {
    title: "Classic Reuben Sandwich",
    ingredients: [
      "8 slices rye bread",
      "400g corned beef, thinly sliced",
      "250g Swiss cheese, sliced",
      "200g sauerkraut, drained",
      "4 tbsp Russian dressing",
      "2 tbsp butter, softened"
    ],
    instructions: "1. Preheat a skillet or griddle over medium heat.\n2. Spread butter on one side of each slice of bread.\n3. Spread Russian dressing on the non-buttered side of 4 slices of bread.\n4. Layer each sandwich with corned beef, Swiss cheese, and sauerkraut.\n5. Top with the remaining bread slices, buttered side out.\n6. Grill the sandwiches for 3-4 minutes per side, until the bread is golden brown and the cheese is melted.\n7. Slice diagonally and serve hot with pickles on the side.",
    cookingTime: "15 minutes",
    difficulty: "Easy"
  }
};

// Common ingredients by dish type
const commonIngredients = {
  sandwich: ["bread", "butter", "lettuce", "tomato", "cheese", "mayonnaise", "mustard"],
  salad: ["lettuce", "olive oil", "vinegar", "salt", "pepper", "cucumber", "tomato"],
  pasta: ["pasta", "olive oil", "garlic", "salt", "pepper", "parmesan cheese"],
  soup: ["stock or broth", "onion", "garlic", "carrot", "celery", "salt", "pepper"],
  cake: ["flour", "sugar", "butter", "eggs", "baking powder", "vanilla extract", "salt"],
  stew: ["meat", "onion", "garlic", "potato", "carrot", "stock", "herbs"],
  curry: ["onion", "garlic", "ginger", "curry powder", "coconut milk", "tomato", "spices"],
  stir_fry: ["oil", "garlic", "ginger", "soy sauce", "vegetables", "protein", "sesame oil"],
  pie: ["flour", "butter", "salt", "sugar", "filling ingredients"],
  bread: ["flour", "yeast", "salt", "water", "sugar"]
};

// Generate a realistic recipe for unknown dishes
const generateRecipe = (dishName) => {
  // Capitalize the dish name
  const title = dishName.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Determine dish type for ingredient selection
  let dishType = 'stew'; // Default type
  const lowerDishName = dishName.toLowerCase();
  
  if (lowerDishName.includes('sandwich') || lowerDishName.includes('burger')) {
    dishType = 'sandwich';
  } else if (lowerDishName.includes('salad')) {
    dishType = 'salad';
  } else if (lowerDishName.includes('pasta') || lowerDishName.includes('spaghetti') || lowerDishName.includes('lasagna')) {
    dishType = 'pasta';
  } else if (lowerDishName.includes('soup')) {
    dishType = 'soup';
  } else if (lowerDishName.includes('cake') || lowerDishName.includes('cookie') || lowerDishName.includes('brownie')) {
    dishType = 'cake';
  } else if (lowerDishName.includes('stew') || lowerDishName.includes('casserole')) {
    dishType = 'stew';
  } else if (lowerDishName.includes('curry')) {
    dishType = 'curry';
  } else if (lowerDishName.includes('stir') || lowerDishName.includes('fry')) {
    dishType = 'stir_fry';
  } else if (lowerDishName.includes('pie') || lowerDishName.includes('tart')) {
    dishType = 'pie';
  } else if (lowerDishName.includes('bread') || lowerDishName.includes('muffin') || lowerDishName.includes('roll')) {
    dishType = 'bread';
  }
  
  // Get base ingredients for the dish type
  let ingredients = [...commonIngredients[dishType]];
  
  // Add specific ingredients based on dish name
  lowerDishName.split(' ').forEach(word => {
    if (word.length > 3 && !ingredients.includes(word)) {
      // Add the word as an ingredient if it's not already there and not a common word
      if (!['with', 'and', 'the', 'for', 'from', 'style', 'made'].includes(word)) {
        ingredients.push(word);
      }
    }
  });
  
  // Limit to 8 ingredients and capitalize first letter
  ingredients = ingredients.slice(0, 8).map(ing => 
    ing.charAt(0).toUpperCase() + ing.slice(1)
  );
  
  // Generate instructions based on dish type
  let instructions = "";
  
  switch (dishType) {
    case 'sandwich':
      instructions = "1. Prepare all ingredients, slicing vegetables and cheese as needed.\n2. Toast the bread if desired.\n3. Spread condiments on the bread slices.\n4. Layer the ingredients on the bread.\n5. Top with the second slice of bread and cut as desired.\n6. Serve immediately.";
      break;
    case 'salad':
      instructions = "1. Wash and prepare all vegetables.\n2. Combine all ingredients in a large bowl.\n3. Prepare the dressing by mixing oil, vinegar, and seasonings.\n4. Toss the salad with the dressing just before serving.\n5. Serve chilled.";
      break;
    case 'pasta':
      instructions = "1. Bring a large pot of salted water to a boil.\n2. Cook pasta according to package instructions until al dente.\n3. While pasta cooks, prepare the sauce by sautéing aromatics and other ingredients.\n4. Drain pasta, reserving some cooking water.\n5. Combine pasta with sauce, adding pasta water if needed for consistency.\n6. Serve hot with grated cheese on top.";
      break;
    case 'soup':
      instructions = "1. Prepare all ingredients, chopping vegetables into even pieces.\n2. In a large pot, sauté aromatics until fragrant.\n3. Add remaining ingredients and broth.\n4. Bring to a boil, then reduce heat and simmer until vegetables are tender.\n5. Season to taste and serve hot.";
      break;
    case 'cake':
      instructions = "1. Preheat oven to 350°F (175°C) and prepare your baking pan.\n2. Mix dry ingredients in one bowl.\n3. Cream butter and sugar in another bowl, then add eggs and vanilla.\n4. Gradually combine wet and dry ingredients.\n5. Pour batter into prepared pan and bake for 30-35 minutes or until a toothpick comes out clean.\n6. Cool completely before frosting or serving.";
      break;
    default:
      instructions = "1. Prepare all ingredients according to recipe requirements.\n2. Cook following traditional methods for this dish.\n3. Combine ingredients in the proper order.\n4. Adjust seasonings to taste.\n5. Serve and enjoy!";
  }
  
  // Determine cooking time and difficulty based on dish type
  let cookingTime = "30 minutes";
  let difficulty = "Intermediate";
  
  if (dishType === 'sandwich' || dishType === 'salad') {
    cookingTime = "15 minutes";
    difficulty = "Easy";
  } else if (dishType === 'stew' || dishType === 'curry') {
    cookingTime = "60 minutes";
    difficulty = "Intermediate";
  } else if (dishType === 'cake' || dishType === 'bread') {
    cookingTime = "45 minutes plus cooling/rising time";
    difficulty = "Intermediate";
  }
  
  return {
    title: `${title}`,
    ingredients: ingredients,
    instructions: instructions,
    cookingTime: cookingTime,
    difficulty: difficulty
  };
};

export const openai = {
  async generateRecipe(dishName) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const lowerCaseDishName = dishName.toLowerCase();
        
        // Try to find an exact match
        if (mockRecipes[lowerCaseDishName]) {
          return resolve(mockRecipes[lowerCaseDishName]);
        }
        
        // Try to find a partial match
        for (const key in mockRecipes) {
          if (key.includes(lowerCaseDishName) || lowerCaseDishName.includes(key)) {
            return resolve(mockRecipes[key]);
          }
        }
        
        // If no match found, generate a dynamic recipe
        const generatedRecipe = generateRecipe(dishName);
        resolve(generatedRecipe);
      }, 1500); // 1.5 second delay to simulate API call
    });
  }
};
