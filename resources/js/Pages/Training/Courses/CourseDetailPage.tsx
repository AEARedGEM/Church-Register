import React, { useState } from 'react';
import {
  Play, Clock, Signal, Globe, Award, Download, Share2, Heart,
  Star, CheckCircle, ChevronDown, ChevronUp, Users, BarChart,
  FileText, Video, Book, Code, Lock, PlayCircle,
  ArrowLeft, Home, BookOpen, Wallet, DollarSign, Users as UsersIcon
} from 'lucide-react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import { router, usePage, Link, Head } from '@inertiajs/react';

interface CourseDetailPageProps {
  course: any;
  onEnroll: () => void;
  isEnrolled?: boolean;
  userProgress?: number;
  onBack?: () => void;
}

interface PageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export default function CourseDetailPage({
  course,
  isEnrolled = false,
  userProgress = 0,
  onBack
}: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [enrolling, setEnrolling] = useState(false);
  const { auth } = usePage().props;

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleExpandAll = () => {
    if (expandedSections.length === (course.sections?.length || 0)) {
      // Collapse all
      setExpandedSections([]);
    } else {
      // Expand all
      setExpandedSections((course.sections || []).map((s: any) => s.id));
    }
  };

  const handleEnroll = async () => {
    if (enrolling) return;
    setEnrolling(true);

    try {
      await router.post(route('training.courses.enroll', course.slug), {}, { preserveScroll: true });
      // After successful post, explicitly navigate to the player using the slug
      router.visit(route('training.course.player', course.slug));
    } catch (err) {
      console.error('Enrollment failed:', err);
    } finally {
      setEnrolling(false);
    }
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger'
    };
    return colors[level] || 'default';
  };

  // Mock curriculum data - replace with actual course curriculum
  const mockCurriculum = {
    total_sections: course.sections?.length || 0,
    total_lectures: course.sections?.reduce((sum: number, section: any) => sum + (section.lectures?.length || 0), 0) || 0,
    total_hours: course.duration_hours || "0",
    sections: course.sections || []
  };

  return (
    <ModernLayout>
      <Head title={`${course.title} - APGA Worldwide`} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Back Button */}
        {onBack && (
          <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 sm:px-6 py-3">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Course Info */}
              <div className="lg:col-span-2">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm mb-4 text-gray-300">
                  <span>Home</span>
                  <span>/</span>
                  <span>Courses</span>
                  <span>/</span>
                  <span className="text-white">{course.title}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-300 mb-6">
                  {course.description || course.short_description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    course.difficulty_level === 'beginner' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    course.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {course.difficulty_level}
                  </span>

                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating || '4.5'}</span>
                    <span className="text-gray-300">({course.reviews_count || 0} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="w-5 h-5" />
                    <span>{course.enrolled_count?.toLocaleString() || 0} students</span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-5 h-5" />
                    <span>{course.formatted_duration || `${course.duration_hours || 0}h ${course.duration_minutes || 0}m`}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {course.instructor?.name?.split(' ').map((n: string) => n[0]).join('') || 'AI'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Created by</p>
                    <p className="font-semibold">{course.instructor?.name || 'AI Instructor'}</p>
                  </div>
                </div>

                {/* Last Updated */}
                <p className="text-sm text-gray-400 mt-4">
                  Last updated {new Date(course.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Right: Course Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-4">
                  {/* Preview Image */}
                  <div className="relative aspect-video bg-gray-800">
                    {course.thumbnail ? (
                      <img
                        src={`/storage/${course.thumbnail}`}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <button
                        onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                      >
                        <PlayCircle className="w-10 h-10 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Price */}
                    {!isEnrolled && (
                      <div className="mb-6">
                        <div className="flex items-baseline space-x-3 mb-2">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ₦{course.effective_price || course.price || 0}
                          </span>
                          {course.has_discount && (
                            <>
                              <span className="text-lg text-gray-500 line-through">
                                {course.price}
                              </span>
                              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-sm font-medium rounded-full">
                                {course.discount_percentage}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        {course.has_discount && (
                          <p className="text-sm text-red-600 dark:text-red-400">
                            🔥 Limited time offer!
                          </p>
                        )}
                      </div>
                    )}

                    {/* Enrollment Status */}
                    {isEnrolled && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Your Progress</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{userProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${userProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    {isEnrolled ? (
                      <Link
                        href={route('training.course.player', course.slug)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4 inline-block text-center"
                      >
                        Continue Learning
                      </Link>
                    ) : (
                      <button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        aria-busy={enrolling}
                        aria-disabled={enrolling}
                        className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4 ${enrolling ? 'bg-red-500 opacity-70 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                      >
                        {enrolling ? (
                          <span className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <span>Enrolling...</span>
                          </span>
                        ) : 'Enroll Now'}
                      </button>
                    )}

                    {!isEnrolled && (
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                        30-Day Money-Back Guarantee
                      </p>
                    )}

                    {/* Course Includes */}
                    <div className="border-t dark:border-gray-700 pt-4">
                      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        This course includes:
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                          <Video className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{mockCurriculum?.total_hours || '10'} hours on-demand video</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                          <FileText className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{mockCurriculum.total_lectures} articles</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                          <Download className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Downloadable resources</span>
                        </li>
                        <li className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                          <Award className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>Certificate of completion</span>
                        </li>
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-6">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview' as const, label: 'Overview' },
                    { id: 'curriculum' as const, label: 'Curriculum' },
                    { id: 'instructor' as const, label: 'Instructor' },
                    { id: 'reviews' as const, label: 'Reviews' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-red-600 text-red-600 dark:text-red-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      What you'll learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(course.learning_objectives || []).map((outcome: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Course Description
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {course.long_description || course.description}
                    </p>
                  </div>

                  {/* Prerequisites */}
                  {(course.prerequisites || []).length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Requirements
                      </h2>
                      <ul className="space-y-2">
                        {course.prerequisites.map((req: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Course Curriculum
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {mockCurriculum.total_sections} sections • {mockCurriculum.total_lectures} lectures • {course.duration_hours || 0}h {course.duration_minutes || 0}m total length
                      </p>
                    </div>
                    <button
                      onClick={toggleExpandAll}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      {expandedSections.length === (course.sections?.length || 0) && course.sections?.length > 0 ? 'Collapse All' : 'Expand All'}
                    </button>
                  </div>

                  {mockCurriculum.sections.map((section: any) => (
                    <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {expandedSections.includes(section.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {section.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {section.lectures?.length || 0} lectures
                            </p>
                          </div>
                        </div>
                      </button>

                      {expandedSections.includes(section.id) && section.lectures && section.lectures.length > 0 && (
                        <div className="border-t dark:border-gray-700">
                          {section.lectures.map((lecture: any, lectureIndex: number) => (
                            <div
                              key={lecture.id}
                              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-t first:border-t-0 dark:border-gray-700"
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                {lecture.is_completed ? (
                                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                ) : lecture.is_preview ? (
                                  <PlayCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                ) : (
                                  <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}

                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {lecture.title}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                {lecture.is_preview && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded-full">
                                    Preview
                                  </span>
                                )}
                                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                                  {lecture.type === 'video' && <Video className="w-4 h-4" />}
                                  {lecture.type === 'reading' && <Book className="w-4 h-4" />}
                                  {lecture.type === 'quiz' && <FileText className="w-4 h-4" />}
                                  <span className="text-sm">{lecture.duration_minutes || 0}m</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-semibold">
                        {course.instructor?.name?.split(' ').map((n: string) => n[0]).join('') || 'IN'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {course.instructor?.name || 'Unknown Instructor'}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {course.instructor?.bio || course.instructor?.email || 'Professional instructor with expertise in this field.'}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="font-bold text-gray-900 dark:text-white">
                              {(course.instructor?.rating || 0).toFixed(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rating
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white mb-1">
                            {(course.instructor?.enrollments_count || 0).toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Students
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white mb-1">
                            {(course.instructor?.courses_count || 1).toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Courses
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900 dark:text-white mb-1">
                            {(course.reviews_count || 0).toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Reviews
                          </p>
                        </div>
                      </div>

                      <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Rating Overview */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                          {(course.rating || 0).toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(course.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.reviews_count || 0} reviews
                        </p>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map(rating => {
                          const ratingCount = (course.review_distribution?.[rating] || 0);
                          const totalReviews = course.reviews_count || 0;
                          const percentage = totalReviews > 0 ? Math.round((ratingCount / totalReviews) * 100) : 0;
                          return (
                            <div key={rating} className="flex items-center space-x-3 mb-2">
                              <div className="flex items-center space-x-1 w-20">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{rating}</span>
                              </div>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                                {percentage}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Student Reviews
                    </h3>
                    {course.reviews && course.reviews.length > 0 ? (
                      course.reviews.map((review: any) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {review.user?.name || 'Anonymous'}
                              </p>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <Star
                                      key={star}
                                      className={`w-3 h-3 ${
                                        star <= (review.rating || 0)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(review.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {review.comment}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No reviews yet. Be the first to review this course!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Related Courses */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Related Courses
              </h3>
              <div className="space-y-4">
                {/* Related courses would be rendered here */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3">
                    {course.thumbnail ? (
                      <img
                        src={`/storage/${course.thumbnail}`}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center rounded-lg">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
                    Advanced Course
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>0</span>
                    <span>•</span>
                    <span>0 students</span>
                  </div>
                  {/* <p className="font-bold text-gray-900 dark:text-white">$89.99</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
