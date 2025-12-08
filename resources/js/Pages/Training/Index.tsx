import React, { useState } from 'react';
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
import { Head, usePage } from '@inertiajs/react';

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
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
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
        <div className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse`}></div>
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
      title: "Advanced React Patterns",
      category: "Web Development",
      progress: 65,
      thumbnail: "",
      nextLesson: "Lesson 8: Custom Hooks",
      timeRemaining: "2h 30m",
      instructor: "John Doe"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      progress: 40,
      thumbnail: "",
      nextLesson: "Lesson 5: Color Theory",
      timeRemaining: "4h 15m",
      instructor: "Jane Smith"
    }
  ],
  upcomingEvents = [
    {
      id: 1,
      title: "Web Dev Workshop",
      date: "Oct 15, 2025",
      type: "Workshop"
    },
    {
      id: 2,
      title: "Design Challenge",
      date: "Oct 20, 2025",
      type: "Competition"
    }
  ],
  recentAchievements = [
    {
      title: "Completed React Course",
      date: "2 days ago"
    },
    {
      title: "7 Day Streak",
      date: "Today"
    }
  ],
  categories = [
    { id: 1, name: "Web Development", slug: "web-dev", courses_count: 45 },
    { id: 2, name: "Design", slug: "design", courses_count: 32 },
    { id: 3, name: "Data Science", slug: "data-science", courses_count: 28 },
    { id: 4, name: "Business", slug: "business", courses_count: 24 }
  ],
  featuredCourses = [
    {
      id: 1,
      title: "Complete JavaScript Bootcamp",
      thumbnail: "",
      instructor: { name: "Mike Johnson" },
      course_category: { name: "Programming" },
      price: 49.99,
      rating: 4.8,
      enrolled_count: 1250
    },
    {
      id: 2,
      title: "Figma UI Design Course",
      thumbnail: "",
      instructor: { name: "Sarah Lee" },
      course_category: { name: "Design" },
      price: 39.99,
      rating: 4.9,
      enrolled_count: 890
    }
  ]
}: TrainingDashboardProps) {
  const auth = usePage().props.auth;

  return (
    <ModernLayout>
        <Head title="Dashboard"/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mx-auto  sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {auth?.user?.name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Continue your learning journey and achieve your goals
          </p>
        </div>

        {/* Stats Grid - Horizontal scroll on mobile */}
        <div className="mb-6 sm:mb-8">
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={BookOpen}
                  label="Enrolled Courses"
                  value={stats.enrolledCourses}
                  iconColor="text-blue-600"
                  bgColor="bg-blue-50"
                  darkBgColor="dark:bg-blue-900/20"
                  darkIconColor="dark:text-blue-400"
                />
              </div>
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={CheckCircle2}
                  label="Completed"
                  value={stats.completedCourses}
                  iconColor="text-green-600"
                  bgColor="bg-green-50"
                  darkBgColor="dark:bg-green-900/20"
                  darkIconColor="dark:text-green-400"
                />
              </div>
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={Clock}
                  label="Hours Learned"
                  value={stats.hoursLearned}
                  iconColor="text-orange-600"
                  bgColor="bg-orange-50"
                  darkBgColor="dark:bg-orange-900/20"
                  darkIconColor="dark:text-orange-400"
                />
              </div>
              <div className="w-64 flex-shrink-0">
                <StatCard
                  icon={Award}
                  label="Certificates"
                  value={stats.certificatesEarned}
                  iconColor="text-indigo-600"
                  bgColor="bg-indigo-50"
                  darkBgColor="dark:bg-indigo-900/20"
                  darkIconColor="dark:text-indigo-400"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard
              icon={BookOpen}
              label="Enrolled Courses"
              value={stats.enrolledCourses}
              iconColor="text-blue-600"
              bgColor="bg-blue-50"
              darkBgColor="dark:bg-blue-900/20"
              darkIconColor="dark:text-blue-400"
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={stats.completedCourses}
              iconColor="text-green-600"
              bgColor="bg-green-50"
              darkBgColor="dark:bg-green-900/20"
              darkIconColor="dark:text-green-400"
            />
            <StatCard
              icon={Clock}
              label="Hours Learned"
              value={stats.hoursLearned}
              iconColor="text-orange-600"
              bgColor="bg-orange-50"
              darkBgColor="dark:bg-orange-900/20"
              darkIconColor="dark:text-orange-400"
            />
            <StatCard
              icon={Award}
              label="Certificates"
              value={stats.certificatesEarned}
              iconColor="text-indigo-600"
              bgColor="bg-indigo-50"
              darkBgColor="dark:bg-indigo-900/20"
              darkIconColor="dark:text-indigo-400"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Continue Learning & Featured Courses */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Continue Learning Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Continue Learning
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No enrolled courses yet</p>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mt-2 inline-block">
                      Browse courses to get started
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Courses Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Featured Courses
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {featuredCourses.map((course) => (
                  <FeaturedCourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>

            {/* Learning Activity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Learning Activity
                </h2>
                <select className="text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-1.5 w-full sm:w-auto">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <ActivityChart />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Current Streak */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.currentStreak} Days
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-orange-500 dark:bg-orange-400 h-2 rounded-full transition-all"
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
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Browse Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {category.courses_count}
                    </span>
                  </button>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-center block">
                View All Categories
              </button>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {recentAchievements.length > 0 ? (
                  recentAchievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">No achievements yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Complete courses to earn achievements</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </p>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full whitespace-nowrap">
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming events</p>
                  </div>
                )}
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-center block">
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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors h-full">
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

function CourseCard({ course }: CourseCardProps) {
  return (
    <button className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group text-left">
      <ImageWithFallback
        src={course.thumbnail ? `/storage/${course.thumbnail}` : ''}
        alt={course.title}
        className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded-lg flex-shrink-0"
        fallbackText={course.title}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {course.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{course.category}</p>
          </div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
            {course.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <PlayCircle className="w-3 h-3" />
            <span className="truncate">{course.nextLesson}</span>
          </div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 self-start sm:self-auto">
            Continue
          </span>
        </div>
      </div>
    </button>
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
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
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

function ActivityChart() {
  const days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours: number[] = [2, 3.5, 1.5, 4, 2.5, 1, 3];
  const maxHours: number = Math.max(...hours);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-1 sm:gap-2 h-40 sm:h-48">
        {days.map((day, idx) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-lg relative flex-1 flex items-end">
              <div
                className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg transition-all"
                style={{ height: `${(hours[idx] / maxHours) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{day}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 dark:bg-blue-500 rounded"></div>
          <span>Hours Studied</span>
        </div>
        <span className="font-medium">Total: 17.5 hrs</span>
      </div>
    </div>
  );
}
