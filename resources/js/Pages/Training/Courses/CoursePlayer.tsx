// resources/js/Pages/Training/Courses/CoursePlayer.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { usePage, router, Link, Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import {
  Play, ChevronLeft, ChevronRight, CheckCircle, Lock, Menu, X,
  BookOpen, FileText, Download, MessageSquare,
  BarChart, ArrowLeft, AlertCircle
} from 'lucide-react';
import EnhancedMediaPlayer from '@/Components/Training/EnhancedMediaPlayer';
import ModernLayout from '@/Layouts/Training/TrainingLayout';

// Type Definitions
type LectureType = 'video' | 'youtube' | 'slide' | 'text' | 'reading' | 'quiz' | 'assignment' | 'document';
type MediaType = 'video' | 'youtube' | 'slide' | 'text';
type TabType = 'curriculum' | 'overview' | 'notes' | 'resources';

interface Lecture {
  id: number;
  title: string;
  type: LectureType;
  duration: string;
  video_url?: string;
  content?: string;
  slides?: string[];
  resources?: Record<string, any>;
  is_completed: boolean;
  is_locked: boolean;
  is_preview: boolean;
  order: number;
}

interface Section {
  id: number;
  title: string;
  description?: string;
  order: number;
  lectures: Lecture[];
}

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  duration_hours: number;
  duration_minutes: number;
  course_category: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
    bio?: string;
  };
}

interface Enrollment {
  id: number;
  progress_percentage: number;
  current_lecture_id?: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'dropped';
  enrolled_at: string;
  last_accessed_at?: string;
}

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  course: Course;
  enrollment: Enrollment;
  sections: Section[];
  currentLecture?: Lecture;
}

export default function CoursePlayer() {
  const { auth, course, enrollment, sections, currentLecture } = usePage<PageProps>().props;

  // State Management
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth >= 1024); // Default: open only on lg screens and above
  const [activeTab, setActiveTab] = useState<TabType>('curriculum');
  const [progress, setProgress] = useState<number>(0);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [completingLecture, setCompletingLecture] = useState<number | null>(null);
  const [navigatingLecture, setNavigatingLecture] = useState<number | null>(null);
  const [lectureCompletionStatus, setLectureCompletionStatus] = useState<Record<number, boolean>>({});
  const [mobilePlayerHeight, setMobilePlayerHeight] = useState<number | null>(null);

  // Memoized values for performance
  const sectionsData = useMemo(() => sections || [], [sections]);

  const firstSection = useMemo(() => sectionsData[0], [sectionsData]);

  const firstLecture = useMemo(() =>
    firstSection?.lectures?.[0],
    [firstSection]
  );

  const currentLectureData = useMemo(() =>
    currentLecture || firstLecture,
    [currentLecture, firstLecture]
  );

  // Check if lecture is completed (from API or local state)
  const isCurrentLectureCompleted = useMemo(() => {
    if (!currentLectureData) return false;
    return currentLectureData.is_completed || lectureCompletionStatus[currentLectureData.id] === true;
  }, [currentLectureData, lectureCompletionStatus]);

  const { totalLectures, completedLectures } = useMemo(() => {
    const total = sectionsData.reduce((sum, section) =>
      sum + (section.lectures?.length || 0), 0
    );
    const completed = sectionsData.reduce((sum, section) =>
      sum + (section.lectures?.filter(l => l.is_completed).length || 0), 0
    );
    return { totalLectures: total, completedLectures: completed };
  }, [sectionsData]);

  // Initialize expanded sections
  useEffect(() => {
    if (firstSection && expandedSections.length === 0) {
      setExpandedSections([firstSection.id]);
    }
  }, [firstSection]);

  // Expand section containing current lecture
  useEffect(() => {
    if (currentLectureData) {
      const currentSection = sectionsData.find(section =>
        section.lectures.some(lecture => lecture.id === currentLectureData.id)
      );
      if (currentSection && !expandedSections.includes(currentSection.id)) {
        setExpandedSections(prev => [...prev, currentSection.id]);
      }
    }
  }, [currentLectureData, sectionsData]);

  const toggleSection = (sectionId: number): void => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLectureClick = (lecture: Lecture): void => {
    if (lecture.is_locked) return;

    // Close sidebar on mobile after selecting a lecture
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }

    router.get(
      route('training.course.player', course.slug) + `?lecture=${lecture.id}`,
      {},
      {
        preserveScroll: true,
        preserveState: true
      }
    );
  };

  const handleMarkComplete = (): void => {
    if (!currentLectureData || isCurrentLectureCompleted) return;

    setCompletingLecture(currentLectureData.id);

    router.post(
      route('training.course.lecture.complete', { course: course.slug, lecture: currentLectureData.id }),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page: any) => {
          // Update local completion status immediately
          setLectureCompletionStatus(prev => ({
            ...prev,
            [currentLectureData.id]: true
          }));

          console.log('Lecture marked as complete:', currentLectureData.id);

          // Clear the completing state after a short delay to show the animation
          setTimeout(() => {
            setCompletingLecture(null);
            // Reload page data to get updated enrollment progress
            router.reload();
          }, 800);
        },
        onError: (errors: any) => {
          setCompletingLecture(null);
          console.error('Failed to mark lecture complete:', errors);
          alert('Failed to mark lecture as complete. Please try again.');
        }
      }
    );
  };

  const isLectureCompleted = (lectureId: number): boolean => {
    return lectureCompletionStatus[lectureId] === true;
  };

  const getNextLecture = (): Lecture | null => {
    if (!currentLectureData || !sectionsData.length) return null;

    // Find the current section
    const currentSection = sectionsData.find(section =>
      section.lectures.some(lecture => lecture.id === currentLectureData.id)
    );

    if (!currentSection) return null;

    // Find the next lecture in the current section (regardless of lock status)
    const currentLectureIndex = currentSection.lectures.findIndex(
      lecture => lecture.id === currentLectureData.id
    );

    if (currentLectureIndex !== -1) {
      // Look for the next lecture in the current section
      for (let i = currentLectureIndex + 1; i < currentSection.lectures.length; i++) {
        const lecture = currentSection.lectures[i];
        // Return the next lecture even if it's locked
        return lecture;
      }
    }

    // If no more lectures in current section, find the first lecture in next section
    const currentSectionIndex = sectionsData.indexOf(currentSection);
    for (let i = currentSectionIndex + 1; i < sectionsData.length; i++) {
      const section = sectionsData[i];
      if (section.lectures && section.lectures.length > 0) {
        // Return first lecture of next section
        return section.lectures[0];
      }
    }

    return null;
  };

  const getPreviousLecture = (): Lecture | null => {
    if (!currentLectureData || !sectionsData.length) return null;

    let previousLecture: Lecture | null = null;
    for (const section of sectionsData) {
      if (!section.lectures) continue;

      for (const lecture of section.lectures) {
        if (lecture.id === currentLectureData.id) {
          return previousLecture;
        }
        if (!lecture.is_locked) {
          previousLecture = lecture;
        }
      }
    }
    return null;
  };

  const getMediaType = (lecture: Lecture): MediaType => {
    if (!lecture) return 'text';

    // YouTube videos
    if (lecture.type === 'youtube' ||
        (lecture.video_url && (
          lecture.video_url.includes('youtube.com') ||
          lecture.video_url.includes('youtu.be')
        ))) {
      return 'youtube';
    }

    // Slides/Presentations
    if (lecture.type === 'slide' && lecture.slides && lecture.slides.length > 0) {
      return 'slide';
    }

    // Text content (reading, text, quiz, assignment)
    if (['reading', 'text', 'quiz', 'assignment', 'document'].includes(lecture.type) && lecture.content) {
      return 'text';
    }

    // Regular video
    if (lecture.type === 'video' && lecture.video_url) {
      return 'video';
    }

    return 'text';
  };

  const handleMediaProgress = (progressPercent: number): void => {
    setProgress(progressPercent);
  };

  // Compute mobile player height dynamically to avoid flex compression on small screens
  useEffect(() => {
    const compute = () => {
      try {
        if (typeof window === 'undefined') return;
        if (window.innerWidth >= 1024) {
          setMobilePlayerHeight(null);
          return;
        }
        // For very small iPhone widths we rely on stylesheet rules instead of computed inline height
        if (window.innerWidth <= 414) {
          setMobilePlayerHeight(null);
          return;
        }
        const topEl = document.querySelector('.course-player-top') as HTMLElement | null;
        const controlsEl = document.querySelector('.course-player-controls') as HTMLElement | null;
        const tabsEl = document.querySelector('.course-player-tabs') as HTMLElement | null;

        const topH = topEl ? topEl.getBoundingClientRect().height : 0;
        const controlsH = controlsEl ? controlsEl.getBoundingClientRect().height : 0;
        const tabsH = tabsEl ? tabsEl.getBoundingClientRect().height : 0;

        const extra = 8; // small margin
        const available = Math.max(220, window.innerHeight - topH - controlsH - tabsH - extra);
        // cap to 90% of viewport to give more room to player on small screens
        const cap = Math.floor(window.innerHeight * 0.9);
        const finalH = Math.min(available, cap);
        setMobilePlayerHeight(finalH);
      } catch (e) {
        // fallback
        setMobilePlayerHeight(Math.floor(window.innerHeight * 0.45));
      }
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const tabConfig = [
    { id: 'curriculum' as const, label: 'Curriculum', icon: BookOpen },
    { id: 'overview' as const, label: 'Overview', icon: FileText },
    { id: 'notes' as const, label: 'Notes', icon: MessageSquare },
    { id: 'resources' as const, label: 'Resources', icon: Download }
  ];

  return (
    <ModernLayout>
      <Head title={`${course.title} - Course Player`} />
      <style>{`
        /* Device-specific fixes for small iPhones - increased heights */
        .course-player-media { }
        @media (max-width: 320px) {
          /* iPhone SE */
          .course-player-media { height: 70vh !important; }
        }
        @media (min-width: 321px) and (max-width: 375px) {
          /* iPhone 6/7/8 */
          .course-player-media { height: 74vh !important; }
        }
        @media (min-width: 376px) and (max-width: 414px) {
          /* iPhone 6/7/8 Plus */
          .course-player-media { height: 78vh !important; }
        }
      `}</style>

      {/* Course Player Container - Fixed positioning that works on mobile and desktop */}
      <div className="fixed inset-0 top-16 left-0 lg:left-64 bg-gray-50 dark:bg-gray-900 flex flex-col z-10">
          {/* Top Navigation Bar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-1.5 sm:py-3 flex items-center justify-between flex-shrink-0 course-player-top">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <Link
              href={route('training.course.detail', course.id)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0"
              aria-label="Back to course details"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base lg:text-lg line-clamp-1">
                {course.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-1">
                {currentLectureData?.title || 'No lecture selected'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            <div className="hidden lg:flex items-center space-x-2 text-sm">
              <BarChart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Progress:</span>
              <span className="text-gray-900 dark:text-white font-semibold">{enrollment.progress_percentage}%</span>
            </div>
            <Link
              href={route('training.courses')}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
            >
              <span className="hidden sm:inline">Exit Course</span>
              <span className="sm:hidden">Exit</span>
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Video/Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Media Player (fixed height on small screens, flexible on lg+) */}
            <div
              className="course-player-media bg-black flex items-center justify-center relative overflow-hidden h-[65vh] sm:h-[70vh] md:h-[75vh] lg:h-auto lg:flex-1 min-h-0"
              style={mobilePlayerHeight ? { height: `${mobilePlayerHeight}px` } : undefined}
            >
              {currentLectureData ? (
                <EnhancedMediaPlayer
                  type={getMediaType(currentLectureData)}
                  url={currentLectureData.video_url}
                  content={currentLectureData.content}
                  slides={currentLectureData.slides}
                  title={currentLectureData.title}
                  onComplete={handleMarkComplete}
                    onProgress={handleMediaProgress}
                    onReportTime={(seconds: number) => {
                      try {
                        // Use fetch instead of router.post for JSON endpoints
                        const url = (route as any)('training.activity.record');
                        try {
                          // Use Inertia router.post which handles CSRF and cookies automatically
                          const urlStr = (route as any)('training.activity.record').toString();
                          router.post(urlStr, { lecture_id: currentLectureData.id, seconds }, {
                            preserveState: true,
                            preserveScroll: true,
                            onError: (err: any) => console.error('Failed to report time', err),
                          });
                        } catch (e) {
                          console.error('Failed to report time', e);
                        }
                      } catch (e) {
                        console.error('Failed to report time', e);
                      }
                    }}
                />
              ) : (
                <div className="text-white text-center p-8">
                  <BookOpen className="w-12 lg:w-16 h-12 lg:h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">No Content Available</h3>
                  <p className="text-gray-400 text-sm lg:text-base">Please select a lecture from the curriculum</p>
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 lg:p-4 flex-shrink-0 course-player-controls">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    const prev = getPreviousLecture();
                    if (prev) {
                      setNavigatingLecture(prev.id);
                      handleLectureClick(prev);
                    }
                  }}
                  disabled={!getPreviousLecture()}
                  className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-all duration-200 text-sm lg:text-base"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  onClick={handleMarkComplete}
                  disabled={isCurrentLectureCompleted || !currentLectureData || completingLecture === currentLectureData?.id}
                  className={`px-4 lg:px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 text-sm lg:text-base ${
                    completingLecture === currentLectureData?.id
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : isCurrentLectureCompleted
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } ${
                    !currentLectureData || (isCurrentLectureCompleted && completingLecture !== currentLectureData?.id)
                      ? 'disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed'
                      : ''
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 transition-transform duration-300 ${completingLecture === currentLectureData?.id ? 'scale-125' : ''}`} />
                  <span className="hidden sm:inline">
                    {completingLecture === currentLectureData?.id
                      ? 'Completing...'
                      : isCurrentLectureCompleted
                      ? 'Completed'
                      : 'Mark as Complete'}
                  </span>
                  <span className="sm:hidden">
                    {completingLecture === currentLectureData?.id
                      ? '...'
                      : isCurrentLectureCompleted
                      ? 'Done'
                      : 'Complete'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    const next = getNextLecture();
                    if (next) {
                      setNavigatingLecture(next.id);
                      handleLectureClick(next);
                    }
                  }}
                  disabled={!getNextLecture()}
                  className={`flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base ${
                    navigatingLecture === getNextLecture()?.id
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } ${
                    !getNextLecture()
                      ? 'disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
                      : ''
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${navigatingLecture === getNextLecture()?.id ? 'scale-125' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile Tabs - Visible on all devices, collapsible on lg+ */}
            <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 course-player-tabs">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabConfig.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-1.5 px-2 py-3 text-xs sm:text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Tab Content */}
              <div className="overflow-y-auto max-h-96 sm:max-h-80">
                {activeTab === 'curriculum' && (
                  <div className="p-4 space-y-3">
                    {/* Progress Summary */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Course Progress</span>
                        <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm">{enrollment.progress_percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-2">
                        {completedLectures} of {totalLectures} lectures completed
                      </p>
                    </div>

                    {/* Sections - Simplified for mobile */}
                    {sectionsData.length > 0 ? (
                      sectionsData.map((section) => (
                        <div key={section.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            aria-expanded={expandedSections.includes(section.id)}
                            className="w-full p-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                          >
                            <div className="flex-1 text-left">
                              <h3 className="text-gray-900 dark:text-white font-medium text-xs sm:text-sm mb-1">
                                {section.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-xs">
                                {section.lectures?.length || 0} lectures
                              </p>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                                expandedSections.includes(section.id) ? 'rotate-90' : ''
                              }`}
                            />
                          </button>

                          {expandedSections.includes(section.id) && (
                            <div className="border-t border-gray-200 dark:border-gray-800">
                              {section.lectures.map((lecture) => {
                                const isCurrentLecture = currentLectureData?.id === lecture.id;
                                const isCompleted = lecture.is_completed || lectureCompletionStatus[lecture.id];
                                return (
                                  <button
                                    key={lecture.id}
                                    onClick={() => handleLectureClick(lecture)}
                                    disabled={lecture.is_locked}
                                    className={`w-full p-3 flex items-start space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-xs sm:text-sm ${
                                      isCurrentLecture
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600'
                                        : ''
                                    } ${lecture.is_locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    ) : lecture.is_locked ? (
                                      <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    ) : (
                                      <Play className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-gray-900 dark:text-white font-medium line-clamp-1">
                                        {lecture.title}
                                      </p>
                                      <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs">
                                        {lecture.type} • {lecture.duration}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-600 dark:text-gray-400 text-sm">
                        No sections available
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'overview' && (
                  <div className="p-4 space-y-4 text-sm">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold mb-2">About This Course</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{course.description}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold mb-2">Course Details</h3>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <p><span className="font-medium">Duration:</span> {course.duration_hours}h {course.duration_minutes}m</p>
                        <p><span className="font-medium">Category:</span> {course.course_category.name}</p>
                        <p><span className="font-medium">Instructor:</span> {course.instructor.name}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="p-4 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        Notes feature coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } fixed lg:relative inset-y-0 right-0 w-full sm:w-96 lg:w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 z-20 lg:translate-x-0`}
          >
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex">
                {tabConfig.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-2 lg:px-4 py-3 text-xs lg:text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'curriculum' && (
                <div className="p-4 space-y-2">
                  {/* Progress Summary */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Course Progress</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{enrollment.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      {completedLectures} of {totalLectures} lectures completed
                    </p>
                  </div>

                  {/* Sections */}
                  {sectionsData.length > 0 ? (
                    sectionsData.map((section) => (
                      <div key={section.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleSection(section.id)}
                          aria-expanded={expandedSections.includes(section.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <div className="flex-1 text-left">
                            <h3 className="text-gray-900 dark:text-white font-medium text-sm mb-1">
                              {section.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                              {section.lectures?.length || 0} lectures
                            </p>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                              expandedSections.includes(section.id) ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                          {expandedSections.includes(section.id) && (
                            <div className="border-t border-gray-200 dark:border-gray-800">
                              {section.lectures.map((lecture) => {
                              const isCurrentLecture = currentLectureData?.id === lecture.id;
                              const isCompleted = lecture.is_completed || lectureCompletionStatus[lecture.id];
                              return (
                                <button
                                  key={lecture.id}
                                  onClick={() => handleLectureClick(lecture)}
                                  disabled={lecture.is_locked}
                                  className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-800 last:border-b-0 ${
                                    isCurrentLecture ? 'bg-gray-100 dark:bg-gray-800' : ''
                                  } ${lecture.is_locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <div className="flex-shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                                    ) : lecture.is_locked ? (
                                      <Lock className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                                    ) : isCurrentLecture ? (
                                      <Play className="w-5 h-5 text-blue-600" />
                                    ) : (
                                      <div className="w-5 h-5 border-2 border-gray-400 dark:border-gray-600 rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex-1 text-left min-w-0">
                                    <p className={`text-sm font-medium truncate ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                      {lecture.title}
                                    </p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                                      <span className="capitalize">{lecture.type}</span>
                                      <span>•</span>
                                      <span>{lecture.duration}</span>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No curriculum available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="p-4">
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-4">About This Course</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>

                  <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Instructor</h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">
                          {course.instructor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-900 dark:text-white font-medium">{course.instructor.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{course.course_category.name}</p>
                      </div>
                    </div>
                    {course.instructor.bio && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{course.instructor.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="p-4">
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">No notes yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Take notes while watching lectures to remember important points
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="p-4">
                  <div className="text-center py-12">
                    <Download className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">No resources available</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Downloadable resources will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-10 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </ModernLayout>
  );
}
