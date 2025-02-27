
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
  }
};

export const openai = {
  async generateRecipe(dishName) {
    return new Promise((resolve, reject) => {
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
        
        // If no match found, generate a generic recipe
        const genericRecipe = {
          title: `${dishName.charAt(0).toUpperCase() + dishName.slice(1)}`,
          ingredients: [
            "Ingredient 1",
            "Ingredient 2",
            "Ingredient 3",
            "Ingredient 4",
            "Ingredient 5"
          ],
          instructions: "1. Prepare all ingredients.\n2. Cook according to traditional methods.\n3. Combine ingredients in the proper order.\n4. Serve and enjoy!",
          cookingTime: "30-45 minutes",
          difficulty: "Intermediate"
        };
        
        resolve(genericRecipe);
      }, 1500); // 1.5 second delay to simulate API call
    });
  }
};
