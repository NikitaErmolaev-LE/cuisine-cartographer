
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SearchBarProps {
  className?: string;
  onSearch: (query: string) => Promise<void>;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a dish name');
      return;
    }
    
    try {
      await onSearch(query.trim());
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search. Please try again.');
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center w-full animate-slide-down"
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-20 py-3 text-base text-foreground bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Enter a European dish name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          className="absolute right-1 top-1 bottom-1 px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 border-t-2 border-r-2 border-primary-foreground rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          ) : (
            'Search'
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
