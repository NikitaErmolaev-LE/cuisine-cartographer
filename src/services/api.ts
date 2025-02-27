
// This would typically connect to your Yii2 backend
// For now, we'll mock the API responses
export const api = {
  async searchProducts(ingredients) {
    try {
      // In a real implementation, you would call your Yii2 backend
      // For example:
      // return await fetch('/api/products?ingredients=' + ingredients.join(','))
      //   .then(res => res.json())
      
      // For demo purposes, we'll return mock data
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
// In a real implementation, this would come from your Yii2 backend
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
  }
];
