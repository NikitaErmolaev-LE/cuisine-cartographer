
// Mock implementation of API service

// Mock product database
const mockProducts = [
  {
    id: 1,
    title: "Spaghetti",
    price: 2.99,
    description: "High quality Italian pasta",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Parmesan Cheese",
    price: 5.49,
    description: "Aged Italian cheese, perfect for pasta dishes",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Pancetta",
    price: 4.99,
    description: "Italian cured pork belly meat",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Eggs",
    price: 3.49,
    description: "Free-range organic eggs",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Olive Oil",
    price: 8.99,
    description: "Extra virgin olive oil from Italy",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Pizza Dough",
    price: 3.99,
    description: "Ready-made pizza dough",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 7,
    title: "Mozzarella",
    price: 4.49,
    description: "Fresh mozzarella cheese",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 8,
    title: "Tomatoes",
    price: 2.99,
    description: "San Marzano tomatoes",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 9,
    title: "Basil",
    price: 1.99,
    description: "Fresh Italian basil",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 10,
    title: "Arborio Rice",
    price: 4.99,
    description: "Italian risotto rice",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 11,
    title: "Mushrooms",
    price: 3.49,
    description: "Mixed gourmet mushrooms",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 12,
    title: "White Wine",
    price: 12.99,
    description: "Dry white wine, perfect for cooking",
    imageUrl: "/placeholder.svg"
  }
];

export const api = {
  async searchProducts(ingredients) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // Filter products based on ingredients
        const foundProducts = mockProducts.filter(product => {
          return ingredients.some(ingredient => {
            const lowerCaseIngredient = ingredient.toLowerCase();
            return product.title.toLowerCase().includes(lowerCaseIngredient) || 
                   lowerCaseIngredient.includes(product.title.toLowerCase());
          });
        });
        
        // If no products found, return some default products
        if (foundProducts.length === 0) {
          resolve(mockProducts.slice(0, 5));
        } else {
          resolve(foundProducts);
        }
      }, 1000); // 1 second delay to simulate API call
    });
  }
};
