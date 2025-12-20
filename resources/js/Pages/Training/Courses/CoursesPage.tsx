// resources/js/Pages/Training/Courses/CoursesPage.tsx
import React, { useState } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import {
  Search, Grid, List, Star, Users, Clock,
  BookOpen, Heart, Share2, PlayCircle
} from 'lucide-react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';

interface Course {
  id: number;
  title: string;
  description: string;
  short_description: string | null;
  thumbnail: string | null;
  price: number;
  discount_price: number | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  duration_minutes: number;
  rating: number;
  reviews_count: number;
  enrolled_count: number;
  is_featured: boolean;
  is_premium: boolean;
  course_category: {
    id: number;
    name: string;
    slug: string;
  };
  skill_type: {
    id: number;
    name: string;
    slug: string;
  };
  instructor: {
    id: number;
    name: string;
    avatar?: string;
  };
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  courses_count: number;
  description?: string;
}

interface SkillType {
  id: number;
  name: string;
  slug: string;
  courses_count: number;
}

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  courses: {
    data: Course[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
  };
  categories: Category[];
  skill_types: SkillType[];
  difficulty_levels: string[];
  featured_courses: Course[];
  enrolled_courses?: {
    data: Course[];
  };
  filters?: {
    category?: string;
    skill_type?: string;
    difficulty?: string;
    price_type?: string;
    search?: string;
    sort_by?: string;
  };
}

interface FilterState {
  category: string;
  skill_type: string;
  difficulty: string;
  price_type: string;
  rating: number;
  sort_by: string;
  search: string;
}

export default function CoursesPage() {
  const { auth, courses, categories, skill_types, featured_courses, enrolled_courses } = usePage<PageProps>().props;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    skill_type: '',
    difficulty: '',
    price_type: '',
    rating: 0,
    sort_by: 'featured',
    search: ''
  });

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'green' },
    { value: 'intermediate', label: 'Intermediate', color: 'yellow' },
    { value: 'advanced', label: 'Advanced', color: 'red' }
  ];

  const priceTypes = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      skill_type: '',
      difficulty: '',
      price_type: '',
      rating: 0,
      sort_by: 'featured',
      search: ''
    });
  };

  const getDifficultyColor = (level: string): string => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const getEffectivePrice = (course: Course): number => {
    return course.discount_price ?? course.price;
  };

  const hasDiscount = (course: Course): boolean => {
    return !!(course.discount_price && course.discount_price < course.price);
  };

  const handleCourseClick = (courseId: number) => {
    router.visit(route('training.course.detail', courseId));
  };

  const CourseCard: React.FC<{ course: Course; variant?: 'default' | 'featured' }> = ({
    course,
    variant = 'default'
  }) => {
    const effectivePrice = getEffectivePrice(course);
    const discountPercentage = hasDiscount(course)
      ? Math.round(((course.price - effectivePrice) / course.price) * 100)
      : 0;

    return (
      <div
        onClick={() => handleCourseClick(course.id)}
        className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
          variant === 'featured' ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
        }`}
      >
        {/* Course Image */}
        <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
          {course.thumbnail ? (
            <img
              src={`/storage/${course.thumbnail}`}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty_level)}`}>
              {course.difficulty_level}
            </span>
          </div>
          {variant === 'featured' && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCourseClick(course.id);
              }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <PlayCircle className="w-6 h-6 text-blue-600" />
            </button>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
              {course.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {course.short_description || course.description}
          </p>

          {/* <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span>({course.reviews_count})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolled_count}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration_hours}h {course.duration_minutes}m</span>
            </div>
          </div> */}
{/*
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              {effectivePrice === 0 ? (
                <span className="text-lg font-bold text-green-600 dark:text-green-400">Free</span>
              ) : (
                <>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${effectivePrice.toFixed(2)}
                  </span>
                  {hasDiscount(course) && (
                    <span className="text-sm text-gray-500 line-through">
                      ${course.price.toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>
            {hasDiscount(course) && (
              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded-full">
                {discountPercentage}% OFF
              </span>
            )}
          </div> */}

        </div>
      </div>
    );
  };

  const CourseListView: React.FC<{ course: Course }> = ({ course }) => {
    const effectivePrice = getEffectivePrice(course);
    const discountPercentage = hasDiscount(course)
      ? Math.round(((course.price - effectivePrice) / course.price) * 100)
      : 0;

    return (
      <div
        onClick={() => handleCourseClick(course.id)}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="flex space-x-4">
          {/* Course Image */}
          <div className="flex-shrink-0 w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {course.thumbnail ? (
              <img
                src={`/storage/${course.thumbnail}`}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-xs">No Image</span>
              </div>
            )}
          </div>

          {/* Course Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {course.short_description || course.description}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty_level)}`}>
                {course.difficulty_level}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{course.rating.toFixed(1)}</span>
                <span>({course.reviews_count})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.enrolled_count} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration_hours}h {course.duration_minutes}m</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.course_category.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-2">
                {effectivePrice === 0 ? (
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">Free</span>
                ) : (
                  <>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${effectivePrice.toFixed(2)}
                    </span>
                    {hasDiscount(course) && (
                      <span className="text-sm text-gray-500 line-through">
                        ${course.price.toFixed(2)}
                      </span>
                    )}
                  </>
                )}
              </div>
              {hasDiscount(course) && (
                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-sm font-medium rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const activeFiltersCount = Object.values(filters).filter(value =>
    value !== '' && value !== 0 && value !== 'featured'
  ).length;

  // Safe data access with fallbacks
  const coursesData = courses?.data || [];
  const categoriesData = categories || [];
  const skillTypesData = skill_types || [];
  const featuredCoursesData = featured_courses || [];

  return (
    <ModernLayout>
        <Head title="Courses"/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Explore Our Courses
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Discover the perfect course to advance your career and expand your skills
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or instructors..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            {/* <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24"> */}
                {/* <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Clear all
                    </button>
                  )}
                </div> */}

                {/* Categories */}
                {/* <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categoriesData.map(category => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category.slug}
                          onChange={() => handleFilterChange('category', category.slug)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {category.name} ({category.courses_count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div> */}

                {/* Skill Types */}
                {/* <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Skill Types</h3>
                  <div className="space-y-2">
                    {skillTypesData.map(skillType => (
                      <label key={skillType.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="skill_type"
                          checked={filters.skill_type === skillType.slug}
                          onChange={() => handleFilterChange('skill_type', skillType.slug)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {skillType.name} ({skillType.courses_count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div> */}

                {/* Difficulty Level */}
                {/* <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Difficulty</h3>
                  <div className="space-y-2">
                    {difficultyLevels.map(level => (
                      <label key={level.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="difficulty"
                          checked={filters.difficulty === level.value}
                          onChange={() => handleFilterChange('difficulty', level.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {level.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div> */}

                {/* Price Type */}
                {/* <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Price</h3>
                  <div className="space-y-2">
                    {priceTypes.map(priceType => (
                      <label key={priceType.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="price_type"
                          checked={filters.price_type === priceType.value}
                          onChange={() => handleFilterChange('price_type', priceType.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {priceType.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div> */}
              {/* </div>
            </div> */}

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {coursesData.length} of {courses.total} courses
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={filters.sort_by}
                    onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Featured Courses */}
              {featuredCoursesData.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredCoursesData.map(course => (
                      <CourseCard key={course.id} course={course} variant="featured" />
                    ))}
                  </div>
                </div>
              )}

              {/* All Courses */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Courses</h2>

                {coursesData.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
                    <button
                      onClick={clearFilters}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {coursesData.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coursesData.map(course => (
                      <CourseListView key={course.id} course={course} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {courses.last_page > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      {Array.from({ length: courses.last_page }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
