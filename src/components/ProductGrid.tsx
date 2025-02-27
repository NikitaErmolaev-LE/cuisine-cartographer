
import React from 'react';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';

const ProductGrid = ({ className, products, title }) => {
  if (!products.length) return null;

  return (
    <div className={cn("w-full max-w-7xl mx-auto mt-8", className)}>
      <h2 className="text-2xl font-medium mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
