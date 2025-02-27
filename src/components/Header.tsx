
import React from 'react';
import { cn } from '@/lib/utils';

const Header = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-4 sm:px-6 lg:px-8 glass sticky top-0 z-10 animate-fade-in", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">CC</span>
          </span>
          <h1 className="text-xl font-medium">Cuisine Cartographer</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
