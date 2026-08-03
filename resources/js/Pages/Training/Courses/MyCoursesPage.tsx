// MyCoursesPage.tsx
import React from 'react';
import { usePage, router, Link, Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import { BookOpen, Clock, PlayCircle, Download } from 'lucide-react';

interface Enrollment {
  id: number;
  progress_percentage: number;
  enrolled_at: string;
  status: string;
  course: {
    id: number;
    slug: string;
    title: string;
    description: string;
    thumbnail: string | null;
    difficulty_level: string;
    duration_hours: number;
    duration_minutes: number;
    course_category: {
      id: number;
      name: string;
    };
    instructor: {
      id: number;
      name: string;
    };
  };
}

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  enrolledCourses: {
    data: Enrollment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters?: {
    status?: string;
  };
}

export default function MyCoursesPage() {
  const { auth, enrolledCourses } = usePage<PageProps>().props;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 50) return 'bg-emerald-600';
    if (progress >= 25) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  const enrollmentsData = enrolledCourses?.data || [];

  return (
    <ModernLayout>
        <Head title="My Courses"/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Courses
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue your learning journey
            </p>
          </div>

          {/* Courses Grid */}
          {enrollmentsData.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No courses enrolled yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start by browsing our available courses
              </p>
              <Link
                href={route('training.courses')}
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {enrollmentsData.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Course Image */}
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    {enrollment.course.thumbnail ? (
                      <img
                        src={`/storage/${enrollment.course.thumbnail}`}
                        alt={enrollment.course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <Link
                        href={route('training.course.player', enrollment.course.slug)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <PlayCircle className="w-6 h-6 text-emerald-600" />
                      </Link>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    {/* Status Badge */}
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        enrollment.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : enrollment.status === 'in_progress'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {enrollment.status === 'not_started' ? 'Not Started' :
                         enrollment.status === 'in_progress' ? 'In Progress' :
                         enrollment.status === 'completed' ? 'Completed' :
                         enrollment.status}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {enrollment.course.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>
                        {enrollment.course.duration_hours}h {enrollment.course.duration_minutes}m
                      </span>
                      <span>•</span>
                      <span>{enrollment.course.course_category.name}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {enrollment.progress_percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(enrollment.progress_percentage)}`}
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <Link
                      href={route('training.course.player', enrollment.course.slug)}
                      disabled={enrollment.status === 'completed'}
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors inline-block text-center
                          ${
                          enrollment.status === 'completed'
                              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                    >
                      {enrollment.status === 'in_progress'
                          ? 'Continue'
                          : enrollment.status === 'completed'
                          ? 'Completed'
                          : 'Start'} Learning
                    </Link>

                    {enrollment.status === 'completed' && (
                      <Link
                        href={route('training.certificate.show', enrollment.id)}
                        className="w-full flex items-center justify-center space-x-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Certificate</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModernLayout>
  );
}
