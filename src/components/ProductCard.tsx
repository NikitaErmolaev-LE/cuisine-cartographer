
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Product } from './ProductGrid';

interface ProductCardProps {
  className?: string;
  product: Product;
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({ className, product, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-lg border hover-lift",
        className
      )}
      style={style}
    >
      <div className="aspect-square overflow-hidden bg-muted/30">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <div className="h-8 w-8 border-t-2 border-r-2 border-primary rounded-full animate-spin"></div>
          </div>
        )}
        
        {!imageError ? (
          <img
            src={product.img}
            alt={product.title}
            className={cn(
              "object-cover w-full h-full transition-all duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground">
            No image
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium truncate" title={product.title}>
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
