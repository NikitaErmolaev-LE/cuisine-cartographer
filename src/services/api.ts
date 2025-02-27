
// This would normally connect to our Yii2 backend
// For now, we'll use a mock implementation to avoid connection issues

export const api = {
  async searchProducts(ingredients) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response with filtered products
      return mockProducts.filter(product => 
        ingredients.some(ingredient => 
          product.title.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch products');
    }
  }
};

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: "Fresh Basil",
    img: "https://images.unsplash.com/photo-1600058215001-e4a33dc87d17?w=600&auto=format&fit=crop",
    price: 2.99
  },
  {
    id: 2,
    title: "Olive Oil (Extra Virgin)",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop",
    price: 8.99
  },
  {
    id: 3,
    title: "Garlic Bulb",
    img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&auto=format&fit=crop",
    price: 1.49
  },
  {
    id: 4,
    title: "Parmesan Cheese",
    img: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&auto=format&fit=crop",
    price: 6.99
  },
  {
    id: 5,
    title: "Pine Nuts",
    img: "https://images.unsplash.com/photo-1645630729453-3e736a1f67c9?w=600&auto=format&fit=crop",
    price: 9.99
  },
  {
    id: 6,
    title: "Spaghetti Pasta",
    img: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop",
    price: 2.49
  },
  {
    id: 7,
    title: "Tomatoes",
    img: "https://images.unsplash.com/photo-1546094096-0df4bcaad1de?w=600&auto=format&fit=crop",
    price: 3.99
  },
  {
    id: 8,
    title: "Onions",
    img: "https://images.unsplash.com/photo-1618512496248-a07c50a9102e?w=600&auto=format&fit=crop",
    price: 1.99
  },
  {
    id: 9,
    title: "Bell Peppers",
    img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop",
    price: 2.99
  },
  {
    id: 10,
    title: "Ground Beef",
    img: "https://images.unsplash.com/photo-1618512496724-b54b4f7a2175?w=600&auto=format&fit=crop",
    price: 7.99
  },
  {
    id: 11,
    title: "Butter",
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop",
    price: 4.49
  },
  {
    id: 12,
    title: "Flour",
    img: "https://images.unsplash.com/photo-1600109081256-75a8cc7bbc4e?w=600&auto=format&fit=crop",
    price: 2.29
  },
  {
    id: 13,
    title: "Arborio Rice",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=600&auto=format&fit=crop",
    price: 5.99
  },
  {
    id: 14,
    title: "Mushrooms",
    img: "https://images.unsplash.com/photo-1611591437268-1b845b1884ab?w=600&auto=format&fit=crop",
    price: 4.49
  },
  {
    id: 15,
    title: "White Wine",
    img: "https://images.unsplash.com/photo-1566452348683-79a7daa7b37f?w=600&auto=format&fit=crop",
    price: 12.99
  },
  {
    id: 16,
    title: "Vegetable Stock",
    img: "https://images.unsplash.com/photo-1617118602627-ded3b7e95c11?w=600&auto=format&fit=crop",
    price: 3.49
  },
  {
    id: 17,
    title: "Lemons",
    img: "https://images.unsplash.com/photo-1582636244208-bce7e9c9c529?w=600&auto=format&fit=crop",
    price: 1.99
  },
  {
    id: 18,
    title: "Eggs",
    img: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=600&auto=format&fit=crop",
    price: 3.99
  },
  {
    id: 19,
    title: "Bacon",
    img: "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=600&auto=format&fit=crop",
    price: 5.99
  },
  {
    id: 20,
    title: "Mozzarella Cheese",
    img: "https://images.unsplash.com/photo-1626957341926-98752fc2ba47?w=600&auto=format&fit=crop",
    price: 5.99
  },
  {
    id: 21,
    title: "Yeast",
    img: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop",
    price: 2.99
  },
  {
    id: 22,
    title: "Thyme",
    img: "https://images.unsplash.com/photo-1603964088262-9c72100f0388?w=600&auto=format&fit=crop",
    price: 2.99
  },
  {
    id: 23,
    title: "Bay Leaves",
    img: "https://images.unsplash.com/photo-1607436519269-39695f93089a?w=600&auto=format&fit=crop",
    price: 2.49
  },
  {
    id: 24,
    title: "Red Wine",
    img: "https://images.unsplash.com/photo-1584916601605-34afda74a6e8?w=600&auto=format&fit=crop",
    price: 13.99
  },
  {
    id: 25,
    title: "Beef Chuck",
    img: "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=600&auto=format&fit=crop",
    price: 12.99
  },
  {
    id: 26,
    title: "Carrots",
    img: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&auto=format&fit=crop",
    price: 2.49
  },
  {
    id: 27,
    title: "Eggplant",
    img: "https://images.unsplash.com/photo-1605196560545-41213819b467?w=600&auto=format&fit=crop",
    price: 3.49
  },
  {
    id: 28,
    title: "Zucchini",
    img: "https://images.unsplash.com/photo-1596720226783-2c973b1e5044?w=600&auto=format&fit=crop",
    price: 2.99
  },
  {
    id: 29,
    title: "Herbs de Provence",
    img: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=600&auto=format&fit=crop",
    price: 4.99
  },
  {
    id: 30,
    title: "Seafood Mix",
    img: "https://images.unsplash.com/photo-1565680018093-ebb6b9ab5460?w=600&auto=format&fit=crop",
    price: 15.99
  },
  {
    id: 31,
    title: "Saffron",
    img: "https://images.unsplash.com/photo-1596387451008-35ca5fc8bcd9?w=600&auto=format&fit=crop",
    price: 18.99
  },
  {
    id: 32,
    title: "Pearl Onions",
    img: "https://images.unsplash.com/photo-1614253429340-d5142734735a?w=600&auto=format&fit=crop",
    price: 3.99
  }
];
