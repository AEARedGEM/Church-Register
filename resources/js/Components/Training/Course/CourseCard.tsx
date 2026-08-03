// components/Course/CourseCard.tsx
import React from 'react';
import { BookOpen, Star, Play, Award } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { ProgressBar } from '../ProgressBar';

export interface ProcessedCourse {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  sections: number;
  modules: number;
  progress: number;
  enrolled: number;
  rating: number;
  instructor: string;
  thumbnail: string;
  status: string;
  enrollment_id?: number;
  started_at?: string;
  completed_at?: string;
  price?: number;
  effective_price?: number;
  is_free?: boolean;
  slug?: string; // Add this
}

interface CourseCardProps {
  course: ProcessedCourse;
  variant?: 'enrolled' | 'available';
  onAction?: () => void;
  onCardClick?: () => void; // Add this
  loading?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = 'available',
  onAction,
  onCardClick, // Add this
  loading = false
}) => {
  const getStatusVariant = (status: string) => {
    const statusMap: Record<string, 'success' | 'info' | 'default'> = {
      'Completed': 'success',
      'In Progress': 'info',
      'Not Started': 'default'
    };
    return statusMap[status] || 'default';
  };

  // Handle card click (navigate to detail)
  const handleCardClick = () => {
    onCardClick?.();
  };

  // Handle action button click (enroll/continue)
  const handleActionClick = () => {
    onAction?.();
  };

  const getActionButton = () => {
    if (variant === 'enrolled') {
      if (course.progress === 100) {
        return (
          <Button
            variant="success"
            fullWidth
            icon={Award}
            onClick={handleActionClick}
          >
            View Certificate
          </Button>
        );
      } else if (course.progress > 0) {
        return (
          <Button
            variant="primary"
            fullWidth
            icon={Play}
            onClick={handleActionClick}
          >
            Continue Learning
          </Button>
        );
      } else {
        return (
          <Button
            variant="primary"
            fullWidth
            onClick={handleActionClick}
          >
            Start Course
          </Button>
        );
      }
    } else {
      return (
        <Button
          variant="primary"
          fullWidth
          onClick={handleActionClick}
          loading={loading}
        >
          View Details
        </Button>
      );
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      {/* Course Banner */}
      <div 
        className="h-32 flex items-center justify-center relative bg-cover bg-center"
        style={{
          backgroundImage: course.thumbnail ? `url(/storage/${course.thumbnail})` : 'none',
          backgroundColor: 'var(--tw-bg-opacity)'
        }}
      >
        {!course.thumbnail && (
          <BookOpen className="w-8 h-8 text-gray-400" />
        )}
        {variant === 'enrolled' && (
          <div className="absolute top-3 right-3">
            <Badge variant={getStatusVariant(course.status)}>
              {course.status}
            </Badge>
          </div>
        )}
        {variant === 'available' && course.is_free && (
          <div className="absolute top-3 left-3">
            <Badge variant="success">Free</Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Course Info */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {course.instructor} • {course.duration}
          </p>
          {variant === 'available' && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Category: {course.category}
            </p>
          )}
        </div>

        {/* Progress Bar for Enrolled Courses */}
        {variant === 'enrolled' && course.progress > 0 && (
          <ProgressBar
            value={course.progress}
            showLabel
            color={course.progress === 100 ? 'green' : 'emerald'}
          />
        )}

        {/* Rating and Enrollment for Available Courses */}
        {variant === 'available' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {course.rating}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({course.enrolled} enrolled)
              </span>
            </div>
            {!course.is_free && course.effective_price && (
              <span className="font-bold text-gray-900 dark:text-white">
                ${course.effective_price}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        {getActionButton()}
      </div>
    </Card>
  );
};
