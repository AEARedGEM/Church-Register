import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../Training/Card';

interface TrainingCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  courses: number;
  description: string;
}

interface CategoryGridProps {
  categories: TrainingCategory[];
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onCategoryClick
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Explore Training Categories
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="p-4 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white">{category.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {category.courses} courses
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
