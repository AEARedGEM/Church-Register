// components/Course/CourseGrid.tsx
import React from 'react';
import { CourseCard, ProcessedCourse } from './CourseCard';

interface CourseGridProps {
  courses: ProcessedCourse[];
  variant?: 'enrolled' | 'available';
  onCourseAction?: (courseId: number) => void;
  onCourseClick?: (courseId: number) => void; // Simplified
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  variant = 'available',
  onCourseAction,
  onCourseClick,
  loading = false,
  emptyState
}) => {
  if (courses.length === 0) {
    return <div>{emptyState}</div>;
  }

  const gridClasses = variant === 'enrolled'
    ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6';

  return (
    <div className={gridClasses}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          variant={variant}
          onAction={() => onCourseAction?.(course.id)}
          onCardClick={() => onCourseClick?.(course.id)}
          loading={loading}
        />
      ))}
    </div>
  );
};
