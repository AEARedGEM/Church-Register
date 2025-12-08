import React from 'react';

interface TrainingCategory {
  id: string;
  name: string;
  courses: number;
}

interface CourseFiltersProps {
  categories: TrainingCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex space-x-3">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} ({category.courses})
          </option>
        ))}
      </select>
    </div>
  );
};
