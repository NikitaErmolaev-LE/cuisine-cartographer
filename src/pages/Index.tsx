
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { toast } from 'sonner';

interface Recipe {
  title: string;
  instructions: string;
  cookingTime: string;
  difficulty: string;
  ingredients: string[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      toast.success('Search initialized!');
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Failed to search', {
        description: 'Please try again with a different term.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container px-4 py-8">
        <SearchBar className="mt-8" onSearch={handleSearch} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
