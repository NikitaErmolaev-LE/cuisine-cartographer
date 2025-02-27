
import React from 'react';
import { cn } from '@/lib/utils';
import { ChefHat, Clock, Utensils, BookOpen } from 'lucide-react';

interface RecipeDisplayProps {
  className?: string;
  recipe: {
    title: string;
    instructions: string;
    cookingTime?: string;
    difficulty?: string;
  } | null;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ className, recipe }) => {
  if (!recipe) return null;

  // Split instructions into steps
  const steps = recipe.instructions
    .split(/\n+/)
    .filter(step => step.trim().length > 0);

  return (
    <div 
      className={cn(
        "w-full max-w-3xl mx-auto mt-8 p-6 bg-card rounded-lg shadow-sm border animate-fade-in",
        className
      )}
    >
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-medium">{recipe.title}</h2>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        {recipe.cookingTime && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime}</span>
          </div>
        )}
        
        {recipe.difficulty && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.difficulty}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          <Utensils className="h-4 w-4" />
          <span>European Cuisine</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Instructions</h3>
        <ol className="space-y-4 pl-5">
          {steps.map((step, index) => (
            <li 
              key={index} 
              className="pl-2 animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-foreground/90">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDisplay;
