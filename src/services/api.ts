
// This connects to our Yii2 backend
export const api = {
  async searchProducts(ingredients) {
    try {
      // Call the Yii2 backend API
      const queryParams = new URLSearchParams();
      queryParams.append('ingredients', ingredients.join(','));
      
      const response = await fetch(`/api/search-products?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch products');
    }
  }
};
