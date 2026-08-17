import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import {
  BookOpen, Plus, Search, Filter, MoreVertical, Edit,
  Trash2, Eye, Users, DollarSign, TrendingUp, Archive,
  CheckCircle, Clock, AlertCircle
} from 'lucide-react';

// Types
interface CourseCategory {
  id: number;
  name: string;
  slug: string;
}

interface SkillType {
  id: number;
  name: string;
  slug: string;
}

interface Instructor {
  id: number;
  name: string;
  email: string;
}

interface Course {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  thumbnail: string | null;
  status: 'draft' | 'published' | 'archived';
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discount_price: number | null;
  duration_hours: number;
  duration_minutes: number;
  is_featured: boolean;
  enrollments_count: number;
  created_at: string;
  course_category: CourseCategory;
  skill_type: SkillType;
  instructor: Instructor;
}

interface PaginatedCourses {
  data: Course[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface Stats {
  total_courses: number;
  published_courses: number;
  draft_courses: number;
  total_students: number;
  total_revenue: number;
}

interface Props {
  courses: PaginatedCourses;
  stats: Stats;
}

const statusColors = {
  draft: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', icon: Clock },
  published: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: CheckCircle },
  archived: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', icon: Archive },
};

const difficultyColors = {
  beginner: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminTrainingIndex({ courses, stats }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('admin.training.index'), { search: searchQuery, status: statusFilter });
  };

  const handleDelete = (courseId: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      router.delete(route('admin.training.destroy', courseId));
    }
  };

  const toggleCourseSelection = (courseId: number) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleBulkStatusUpdate = (status: 'draft' | 'published' | 'archived') => {
    if (selectedCourses.length === 0) return;
    router.post(route('admin.training.bulk-update-status'), {
      course_ids: selectedCourses,
      status,
    });
    setSelectedCourses([]);
  };

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 min-w-[200px] sm:min-w-0 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <ModernLayout>
      <Head title="Training Management" />

      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Training Management</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Manage courses, content, and enrollments</p>
          </div>
          <Link
            href={route('admin.training.create')}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Create Course
          </Link>
        </div>

        {/* Stats Grid - Horizontal Scrollable */}
        <div className="relative -mx-4 sm:mx-0">
          <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              <StatCard
                icon={BookOpen}
                label="Total Courses"
                value={stats.total_courses}
                color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              />
              <StatCard
                icon={CheckCircle}
                label="Published"
                value={stats.published_courses}
                color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              />
              <StatCard
                icon={Clock}
                label="Drafts"
                value={stats.draft_courses}
                color="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              />
              <StatCard
                icon={Users}
                label="Total Students"
                value={stats.total_students}
                color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              />
              <StatCard
                icon={DollarSign}
                label="Total Revenue"
                value={`₦${stats.total_revenue.toLocaleString()}`}
                color="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              Search
            </button>
          </form>

          {selectedCourses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 w-full sm:w-auto">
                {selectedCourses.length} selected
              </span>
              <button
                onClick={() => handleBulkStatusUpdate('published')}
                className="flex-1 sm:flex-none px-3 py-1.5 text-xs sm:text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg transition-colors"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('draft')}
                className="flex-1 sm:flex-none px-3 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                Draft
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('archived')}
                className="flex-1 sm:flex-none px-3 py-1.5 text-xs sm:text-sm bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-400 rounded-lg transition-colors"
              >
                Archive
              </button>
            </div>
          )}
        </div>

        {/* Courses Table/Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCourses.length === courses.data.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCourses(courses.data.map(c => c.id));
                        } else {
                          setSelectedCourses([]);
                        }
                      }}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {courses.data.map((course) => {
                  const StatusIcon = statusColors[course.status].icon;
                  return (
                    <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => toggleCourseSelection(course.id)}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {course.thumbnail ? (
                            <img
                              src={`/storage/${course.thumbnail}`}
                              alt={course.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded ${difficultyColors[course.difficulty_level]}`}>
                                {course.difficulty_level}
                              </span>
                              {course.is_featured && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{course.course_category.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{course.instructor.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[course.status].bg} ${statusColors[course.status].text}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          {course.enrollments_count}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {course.discount_price ? (
                            <>
                              <span className="font-semibold text-gray-900 dark:text-white">₦{course.discount_price.toLocaleString()}</span>
                              <span className="ml-1 text-xs text-gray-500 line-through">₦{course.price.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="font-semibold text-gray-900 dark:text-white">₦{course.price.toLocaleString()}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={route('admin.training.edit', course.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {courses.data.map((course) => {
              const StatusIcon = statusColors[course.status].icon;
              return (
                <div key={course.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourseSelection(course.id)}
                      className="mt-1 rounded border-gray-300 dark:border-gray-600"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        {course.thumbnail ? (
                          <img
                            src={`/storage/${course.thumbnail}`}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">{course.title}</h3>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${difficultyColors[course.difficulty_level]}`}>
                              {course.difficulty_level}
                            </span>
                            {course.is_featured && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Category:</span>
                          <span className="text-gray-900 dark:text-white font-medium">{course.course_category.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Instructor:</span>
                          <span className="text-gray-900 dark:text-white font-medium">{course.instructor.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Status:</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[course.status].bg} ${statusColors[course.status].text}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {course.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Students:</span>
                          <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-medium">
                            <Users className="w-4 h-4" />
                            {course.enrollments_count}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Price:</span>
                          <div>
                            {course.discount_price ? (
                              <>
                                <span className="font-semibold text-gray-900 dark:text-white">₦{course.discount_price.toLocaleString()}</span>
                                <span className="ml-1 text-xs text-gray-500 line-through">₦{course.price.toLocaleString()}</span>
                              </>
                            ) : (
                              <span className="font-semibold text-gray-900 dark:text-white">₦{course.price.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={route('admin.training.edit', course.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {courses.last_page > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                Showing {courses.data.length} of {courses.total} courses
              </p>
              <div className="flex gap-2 overflow-x-auto max-w-full pb-1">
                {Array.from({ length: courses.last_page }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={route('admin.training.index', { page })}
                    className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      page === courses.current_page
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </ModernLayout>
  );
}
