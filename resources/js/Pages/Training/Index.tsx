import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Target,
  Calendar,
  PlayCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';

// Type definitions
interface Stats {
  enrolledCourses: number;
  completedCourses: number;
  inProgress: number;
  hoursLearned: number;
  certificatesEarned: number;
  currentStreak: number;
}

interface Course {
  id: number;
  title: string;
  category: string;
  progress: number;
  thumbnail: string;
  nextLesson: string;
  timeRemaining: string;
  instructor: string;
  slug?: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
  participants?: number;
  prize?: string;
}

interface Achievement {
  title: string;
  date: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  courses_count: number;
}

interface FeaturedCourse {
  id: number;
  title: string;
  thumbnail: string;
  instructor: { name: string };
  course_category: { name: string };
  price: number;
  rating: number;
  enrolled_count: number;
}

interface TrainingDashboardProps {
  stats: Stats;
  enrolledCourses: Course[];
  upcomingEvents: Event[];
  recentAchievements: Achievement[];
  categories: Category[];
  featuredCourses: FeaturedCourse[];
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  iconColor: string;
  bgColor: string;
  darkBgColor: string;
  darkIconColor: string;
}

interface CourseCardProps {
  course: Course;
  onCardClick?: () => void;
  onAction?: () => void;
}

interface FeaturedCourseCardProps {
  course: FeaturedCourse;
}

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className: string;
  fallbackText: string;
}

// Image component with fallback
function ImageWithFallback({ src, alt, className, fallbackText }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getInitials = (text: string): string => {
    const words = text.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  const getColorFromText = (text: string): string => {
    const colors = [
      'bg-red-500',
      'bg-purple-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-red-500',
      'bg-red-500',
      'bg-red-500'
    ];
    const index = text.length % colors.length;
    return colors[index];
  };

  if (error || !src) {
    return (
      <div className={`${className} ${getColorFromText(fallbackText)} flex items-center justify-center text-white font-semibold`}>
        {getInitials(fallbackText)}
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className={`${className} animate-pulse bg-gradient-to-br from-blue-100 via-white to-red-100 dark:from-blue-900 dark:via-slate-800 dark:to-red-900`}></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'hidden' : 'block'}`}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}

export default function TrainingDashboard({
  stats = {
    enrolledCourses: 12,
    completedCourses: 5,
    inProgress: 7,
    hoursLearned: 48,
    certificatesEarned: 5,
    currentStreak: 7
  },
  enrolledCourses = [
    {
      id: 1,
      title: "Foundations of Christian Faith",
      category: "Bible Foundations",
      progress: 65,
      thumbnail: "",
      nextLesson: "Lesson 8: Walking in Faith",
      timeRemaining: "35m",
      instructor: "Pastor John"
    },
    {
      id: 2,
      title: "New Testament Bible Study",
      category: "Bible Study",
      progress: 40,
      thumbnail: "",
      nextLesson: "Lesson 5: The Ministry of Jesus",
      timeRemaining: "45m",
      instructor: "Sister Jane"
    }
  ],
  upcomingEvents = [
    {
      id: 1,
      title: "Sunday School Teachers' Meeting",
      date: "Oct 15, 2025",
      type: "Teachers"
    },
    {
      id: 2,
      title: "Bible Study Fellowship",
      date: "Oct 20, 2025",
      type: "Bible Study"
    }
  ],
  recentAchievements = [
    {
      title: "Completed a Bible lesson",
      date: "2 days ago"
    },
    {
      title: "Seven-day study streak",
      date: "Today"
    }
  ],
  categories = [
    { id: 1, name: "Bible Foundations", slug: "bible-foundations", courses_count: 45 },
    { id: 2, name: "Sunday School", slug: "sunday-school", courses_count: 32 },
    { id: 3, name: "Christian Living", slug: "christian-living", courses_count: 28 },
    { id: 4, name: "Leadership & Service", slug: "leadership-service", courses_count: 24 }
  ],
  featuredCourses = [
    {
      id: 1,
      title: "Old Testament Survey",
      thumbnail: "",
      instructor: { name: "Mike Johnson" },
      course_category: { name: "Bible Foundations" },
      price: 49.99,
      rating: 4.8,
      enrolled_count: 1250
    },
    {
      id: 2,
      title: "Living the Word Daily",
      thumbnail: "",
      instructor: { name: "Sarah Lee" },
      course_category: { name: "Christian Living" },
      price: 39.99,
      rating: 4.9,
      enrolled_count: 890
    }
  ]
}: TrainingDashboardProps) {
  const auth = usePage().props.auth;
  const page = usePage().props as any;

  const [activityRange, setActivityRange] = useState<number>(7);
  const [activityData, setActivityData] = useState<any[]>(Array.isArray(page.learningActivity) ? page.learningActivity : (page.learningActivity?.data || []));
  const [activitySource, setActivitySource] = useState<string | null>(page.learningActivity?.source || null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async (days: number) => {
      try {
        const res = await fetch(`/training/activity?days=${days}`);
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) {
          setActivityData(json.data || []);
          setActivitySource(json.source || null);
        }
      } catch (e) {
        // ignore network errors for now
      }
    };

    fetchData(activityRange);
    return () => { mounted = false; };
  }, [activityRange]);

  const handleCourseClick = (course: Course) => {
    if (course.slug) {
      router.visit(route('training.course.player', course.slug));
    } else if (course.id) {
      router.visit(route('training.course.player', course.id));
    }
  };

  return (
    <ModernLayout>
        <Head title="Sunday School & Bible Study"/>
      <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-red-50 transition-colors dark:from-blue-950 dark:via-slate-950 dark:to-red-950">
      <div className="mx-auto  sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Dashboard-style Word Ministry banner */}
          <div className="mb-6 overflow-hidden rounded-3xl border border-red-200 bg-gradient-to-r from-red-700 via-red-600 to-rose-700 p-6 text-white shadow-lg shadow-red-900/20 dark:border-blue-700 dark:from-blue-950 dark:via-blue-900 dark:to-red-900 sm:mb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-100">APGA Worldwide</p>
                <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Sunday School & Bible Study</h1>
                <p className="mt-2 max-w-2xl text-sm text-red-50 sm:text-base">
                  Welcome back, {auth?.user?.name}. Grow in the Word through lessons, study groups, and faithful practice.
                </p>
              </div>
              <div className="hidden rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-semibold text-white lg:block">
                Learn. Reflect. Live the Word.
              </div>
            </div>
        </div>

        {/* Stats Grid - Horizontal scroll on mobile */}
        <div className="mb-6 sm:mb-8">
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={BookOpen}
                  label="Enrolled Lessons"
                  value={stats.enrolledCourses}
                  iconColor="text-red-600"
                  bgColor="bg-gradient-to-br from-red-50 to-rose-50"
                  darkBgColor="dark:bg-red-900/20"
                  darkIconColor="dark:text-red-400"
                />
              </div>
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={CheckCircle2}
                  label="Lessons Completed"
                  value={stats.completedCourses}
                  iconColor="text-red-600"
                  bgColor="bg-gradient-to-br from-red-50 to-rose-50"
                  darkBgColor="dark:bg-red-900/20"
                  darkIconColor="dark:text-red-400"
                />
              </div>
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={Clock}
                  label="Hours Studied"
                  value={stats.hoursLearned}
                  iconColor="text-orange-600"
                  bgColor="bg-gradient-to-br from-amber-50 to-red-50"
                  darkBgColor="dark:bg-orange-900/20"
                  darkIconColor="dark:text-orange-400"
                />
              </div>
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={Award}
                  label="Certificates"
                  value={stats.certificatesEarned}
                  iconColor="text-red-600"
                  bgColor="bg-gradient-to-br from-red-50 to-rose-50"
                  darkBgColor="dark:bg-red-900/20"
                  darkIconColor="dark:text-red-400"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard
              icon={BookOpen}
              label="Enrolled Lessons"
              value={stats.enrolledCourses}
              iconColor="text-red-600"
              bgColor="bg-gradient-to-br from-red-50 to-rose-50"
              darkBgColor="dark:bg-red-900/20"
              darkIconColor="dark:text-red-400"
            />
            <StatCard
              icon={CheckCircle2}
              label="Lessons Completed"
              value={stats.completedCourses}
              iconColor="text-red-600"
              bgColor="bg-gradient-to-br from-red-50 to-rose-50"
              darkBgColor="dark:bg-red-900/20"
              darkIconColor="dark:text-red-400"
            />
            <StatCard
              icon={Clock}
              label="Hours Studied"
              value={stats.hoursLearned}
              iconColor="text-orange-600"
              bgColor="bg-gradient-to-br from-amber-50 to-red-50"
              darkBgColor="dark:bg-orange-900/20"
              darkIconColor="dark:text-orange-400"
            />
            <StatCard
              icon={Award}
              label="Certificates"
              value={stats.certificatesEarned}
              iconColor="text-red-600"
              bgColor="bg-gradient-to-br from-red-50 to-rose-50"
              darkBgColor="dark:bg-red-900/20"
              darkIconColor="dark:text-red-400"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Continue Learning & Featured Courses */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Continue Learning Section */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Continue Studying
                </h2>
                <Link
                  href={route('training.courses')}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onCardClick={() => handleCourseClick(course)}
                      onAction={() => handleCourseClick(course)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No lessons started yet</p>
                    <Link
                      href={route('training.courses')}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium mt-2 inline-block"
                    >
                      Browse lessons to get started
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Courses Section */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Featured Bible Studies
                </h2>
                <Link
                  href={route('training.courses')}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {featuredCourses.map((course) => (
                  <FeaturedCourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            {/* Learning Activity Chart */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Study Activity
                </h2>
                <select
                  value={activityRange}
                  onChange={(e) => setActivityRange(Number(e.target.value))}
                  className="w-full rounded-lg border border-red-200 bg-gradient-to-r from-white via-rose-50 to-red-50 px-3 py-1.5 text-sm text-slate-700 dark:border-blue-700 dark:from-blue-900 dark:via-slate-900 dark:to-red-950 dark:text-slate-200 sm:w-auto"
                >
                  <option value={7}>Last 7 days</option>
                  <option value={14}>Last 14 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={90}>Last 3 months</option>
                </select>
              </div>
              <ActivityChart activityData={activityData} activitySource={activitySource} activityRange={activityRange} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Current Streak */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-red-100 dark:from-blue-800 dark:to-red-900">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.currentStreak} Days
                  </p>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-blue-100 dark:bg-blue-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-red-600 transition-all"
                  style={{
                    width: `${Math.min((stats.currentStreak / 10) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {10 - stats.currentStreak > 0
                  ? `${10 - stats.currentStreak} more days to reach 10-day streak!`
                  : 'Amazing streak! Keep it up!'}
              </p>
            </div>

            {/* Categories Section */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Browse Study Topics
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="group flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-transparent via-rose-50/40 to-red-50/60 p-3 transition-colors hover:from-blue-50 hover:to-red-100 dark:from-transparent dark:via-blue-900/30 dark:to-red-950/40 dark:hover:from-blue-900/60 dark:hover:to-red-900/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-rose-50 transition-colors dark:from-blue-800 dark:to-red-900">
                        <BookOpen className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                        {category.name}
                      </span>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-blue-100 to-red-100 px-2 py-1 text-xs text-gray-600 dark:from-blue-800 dark:to-red-900 dark:text-gray-200">
                      {category.courses_count}
                    </span>
                  </button>
                ))}
              </div>
              <Link
                href={route('training.courses')}
                className="w-full mt-4 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-center block"
              >
                View All Study Topics
              </Link>
            </div>

            {/* Recent Achievements */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {recentAchievements.length > 0 ? (
                  recentAchievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-800 dark:to-red-900">
                        <Award className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Award className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No study milestones yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Complete lessons to build your study record</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Church Calendar
              </h3>
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="rounded-lg bg-gradient-to-r from-rose-50 via-white to-red-50 p-3 dark:from-blue-900 dark:via-slate-900 dark:to-red-950">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </p>
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full whitespace-nowrap">
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming church activities</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-4 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-center block">
                View All Events
              </button>
            </div>
          </div>
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
    </div>
    </ModernLayout>
  );
}

function StatCard({ icon: Icon, label, value, iconColor, bgColor, darkBgColor, darkIconColor }: StatCardProps) {
  return (
    <div className="h-full rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 transition-colors dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} ${darkBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor} ${darkIconColor}`} />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, onCardClick, onAction }: CourseCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group text-left"
      onClick={onCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick?.();
        }
      }}
    >
      <ImageWithFallback
        src={course.thumbnail ? `/storage/${course.thumbnail}` : ''}
        alt={course.title}
        className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg flex-shrink-0"
        fallbackText={course.title}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate group-hover:text-red-600 dark:group-hover:text-red-400">
              {course.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{course.category}</p>
          </div>
          <span className="text-xs font-medium text-red-600 dark:text-red-400 whitespace-nowrap">
            {course.progress}%
          </span>
        </div>
        <div className="mb-3 h-1.5 w-full rounded-full bg-gradient-to-r from-blue-100 via-white to-red-100 dark:from-blue-900 dark:via-slate-800 dark:to-red-900">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-red-600 transition-all"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <PlayCircle className="w-3 h-3" />
            <span className="truncate">{course.nextLesson}</span>
          </div>
          <button
            className="text-xs font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 self-start sm:self-auto"
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedCourseCard({ course }: FeaturedCourseCardProps) {
  return (
    <button className="w-full flex gap-3 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group text-left">
      <ImageWithFallback
        src={course.thumbnail ? `/storage/${course.thumbnail}` : ''}
        alt={course.title}
        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
        fallbackText={course.title}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate group-hover:text-red-600 dark:group-hover:text-red-400">
          {course.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">{course.course_category.name}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">By {course.instructor.name}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-xs font-medium text-yellow-600 dark:text-yellow-500">
            ⭐ {course.rating}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            • {course.enrolled_count} enrolled
          </span>
        </div>
      </div>
    </button>
  );
}

function ActivityChart({ activityData, activitySource, activityRange }: { activityData?: any[]; activitySource?: string | null; activityRange?: number }) {
  const page: any = usePage().props;

  // Prefer provided prop, then server-provided page props
  const rawActivity: Array<any> | undefined = activityData || page.learningActivity || page.activityData || null;

  // Helper to build last N days labels if no data provided
  const buildLastNDays = (n: number) => {
    const now = new Date();
    const daysArr: string[] = [];
    const hoursArr: number[] = [];
    for (let i = n - 1; i >= 0; i -= 1) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      daysArr.push(d.toLocaleDateString(undefined, { weekday: 'short' }));
      hoursArr.push(0);
    }
    return { daysArr, hoursArr };
  };

  // Helper to build Monday..Sunday labels for current week
  const buildWeekMonToSun = () => {
    const now = new Date();
    // get Monday of current week
    const day = now.getDay(); // 0 (Sun) .. 6 (Sat)
    const diffToMonday = (day === 0) ? -6 : (1 - day);
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    const daysArr: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      daysArr.push(d.toLocaleDateString(undefined, { weekday: 'short' }));
    }
    return daysArr;
  };

  let days: string[] = [];
  let hours: number[] = [];

  if (rawActivity && Array.isArray(rawActivity) && rawActivity.length > 0) {
    // Normalize data: group by weekday order for last 7 days if dates provided
    const mapped = rawActivity.map((item: any) => {
      const d = item.date ? new Date(item.date) : new Date();
      return { date: d, hours: Number(item.hours) || 0 };
    });

    // If range is exactly 7 prefer Mon-Sun week labels and map dates into that week (fill zeros)
    if (activityRange === 7) {
      const weekLabels = buildWeekMonToSun();
      const mapByWeekday: Record<string, number> = {};
      mapped.forEach((m: any) => {
        const w = m.date.toLocaleDateString(undefined, { weekday: 'short' });
        mapByWeekday[w] = (mapByWeekday[w] || 0) + Number(m.hours || 0);
      });
      days = weekLabels;
      hours = weekLabels.map((w) => Number((mapByWeekday[w] || 0)));
    } else {
      // If length is 7 or less, map directly to labels in order
      if (mapped.length <= 7) {
        days = mapped.map((m: any) => m.date.toLocaleDateString(undefined, { weekday: 'short' }));
        hours = mapped.map((m: any) => m.hours);
      } else {
        // If more than 7 points, take the last 7
        const last7 = mapped.slice(-7);
        days = last7.map((m: any) => m.date.toLocaleDateString(undefined, { weekday: 'short' }));
        hours = last7.map((m: any) => m.hours);
      }
    }
  } else {
    // Fallback: try to infer from page.stats.hoursLearned distributed across 7 days
    const stats: any = page.stats || {};
    if (stats.hoursLearned) {
      const avg = Number(stats.hoursLearned) / 7;
      const last = buildLastNDays(7);
      days = last.daysArr;
      hours = last.hoursArr.map(() => Number(avg.toFixed(2)));
    } else {
      // Final fallback: static sample (kept for UX until real data exists)
      const sample = buildLastNDays(7);
      days = sample.daysArr;
      hours = [2, 3.5, 1.5, 4, 2.5, 1, 3];
    }
  }

  const total = hours.reduce((s, v) => s + v, 0);
  const maxHours = Math.max(...hours, 1);

  return (
    <div className="space-y-3">
      {activityRange === 7 && (
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Last 7 days</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Mon — Sun</div>
        </div>
      )}
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex items-end gap-2 h-36 sm:h-48 min-w-full">
          {days.map((day, idx) => (
            <div key={`${day}-${idx}`} className="flex flex-col items-center w-8 sm:w-12">
              <div className="flex w-full items-end rounded-t-lg bg-gradient-to-t from-blue-100 via-white to-red-100 dark:from-blue-900 dark:via-slate-800 dark:to-red-900" style={{ height: '100%' }}>
                <div
                  className="flex w-full items-end justify-center rounded-t-lg bg-gradient-to-t from-blue-600 via-red-500 to-red-400 transition-all"
                  style={{ height: `${(hours[idx] / maxHours) * 100}%`, minHeight: '6px' }}
                  title={`${hours[idx]} hrs`}
                >
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-2 truncate">{day}</span>
              <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{hours[idx]}h</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-1">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-gradient-to-r from-blue-500 via-red-500 to-red-600" />
          <span>Hours Studied</span>
        </div>
        <div className="flex items-center gap-3">
          {activitySource && (
            <span className="text-xs text-gray-500 dark:text-gray-400">Source: {activitySource === 'time_spent' ? 'Real Time' : 'Duration Fallback'}</span>
          )}
          <span className="font-medium">Total: {Number(total.toFixed(2))} hrs</span>
        </div>
      </div>
    </div>
  );
}
