<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\SkillType;
use App\Models\CourseEnrollment;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TrainingController extends Controller
{

//     public function dashboard(Request $request)
// {
//     // Get user's enrolled courses
//     $enrollments = CourseEnrollment::with(['course.courseCategory', 'course.instructor'])
//         ->byUser(Auth::id())
//         ->active()
//         ->orderBy('updated_at', 'desc')
//         ->get();

//     // Get available courses (not enrolled)
//     $availableCourses = Course::published()
//         ->whereNotIn('id', $enrollments->pluck('course_id')->filter())
//         ->with(['courseCategory', 'instructor'])
//         ->orderBy('is_featured', 'desc')
//         ->orderBy('rating', 'desc')
//         ->limit(12)
//         ->get();

//     // Get upcoming events
//     $events = Event::upcoming()
//         ->with(['registrations' => function($query) {
//             $query->where('user_id', Auth::id());
//         }])
//         ->orderBy('start_date')
//         ->limit(6)
//         ->get();

//     // Calculate user stats
//     $completedCourses = $enrollments->where('status', 'completed')->count();
//     $inProgressCourses = $enrollments->where('status', 'in_progress')->count();

//     return Inertia::render('Training/Index', [
//         'stats' => [
//             'enrolledCourses' => $enrollments->count(),
//             'completedCourses' => $completedCourses,
//             'inProgress' => $inProgressCourses,
//             'hoursLearned' => $this->calculateHoursLearned($enrollments),
//             'certificatesEarned' => $enrollments->where('certificate_issued_at', '!=', null)->count(),
//             'currentStreak' => $this->calculateStreak(Auth::id())
//         ],
//         'enrolledCourses' => $enrollments->take(3)->map(function($enrollment) {
//             return [
//                 'id' => $enrollment->course->id,
//                 'title' => $enrollment->course->title,
//                 'category' => $enrollment->course->courseCategory->name,
//                 'progress' => $enrollment->progress_percentage,
//                 'thumbnail' => $enrollment->course->thumbnail,
//                 'nextLesson' => 'Continue Learning', // You'll need to implement this
//                 'timeRemaining' => $this->calculateTimeRemaining($enrollment),
//                 'instructor' => $enrollment->course->instructor->name ?? 'Platform Instructor'
//             ];
//         }),
//         'upcomingEvents' => $events->map(function($event) {
//             return [
//                 'id' => $event->id,
//                 'title' => $event->title,
//                 'date' => $event->start_date->format('M d, Y'),
//                 'type' => $event->event_type,
//                 'participants' => $event->max_participants,
//                 'prize' => $event->prize_amount
//             ];
//         }),
//         'recentAchievements' => $this->getRecentAchievements(Auth::id()),
//         'categories' => CourseCategory::active()
//             ->withCount(['courses' => function($query) {
//                 $query->published();
//             }])
//             ->having('courses_count', '>', 0)
//             ->orderBy('name')
//             ->get(),
//     ]);
// }

public function dashboard(Request $request)
{
    // Get user's enrolled courses
    $enrollments = CourseEnrollment::with(['course.courseCategory', 'course.instructor'])
        ->byUser(Auth::id())
        ->active()
        ->orderBy('updated_at', 'desc')
        ->get();

    // Get available courses (not enrolled)
    $availableCourses = Course::published()
        ->whereNotIn('id', $enrollments->pluck('course_id')->filter())
        ->with(['courseCategory', 'instructor'])
        ->orderBy('is_featured', 'desc')
        ->orderBy('rating', 'desc')
        ->limit(12)
        ->get();

    // Get upcoming events
    $events = Event::upcoming()
        ->with(['registrations' => function($query) {
            $query->where('user_id', Auth::id());
        }])
        ->orderBy('start_date')
        ->limit(6)
        ->get();

    // Get featured courses
    $featuredCourses = Course::published()
        ->featured()
        ->with(['courseCategory', 'instructor'])
        ->limit(6)
        ->get();

    // Calculate user stats
    $completedCourses = $enrollments->where('status', 'completed')->count();
    $inProgressCourses = $enrollments->where('status', 'in_progress')->count();

    return Inertia::render('Training/Index', [
        'stats' => [
            'enrolledCourses' => $enrollments->count(),
            'completedCourses' => $completedCourses,
            'inProgress' => $inProgressCourses,
            'hoursLearned' => $this->calculateHoursLearned($enrollments),
            'certificatesEarned' => $enrollments->where('certificate_issued_at', '!=', null)->count(),
            'currentStreak' => $this->calculateStreak(Auth::id())
        ],
        'enrolledCourses' => $enrollments->take(3)->map(function($enrollment) {
            return [
                'id' => $enrollment->course->id,
                'title' => $enrollment->course->title,
                'category' => $enrollment->course->courseCategory->name,
                'progress' => $enrollment->progress_percentage,
                'thumbnail' => $enrollment->course->thumbnail,
                'nextLesson' => 'Continue Learning', // You can implement this based on course modules
                'timeRemaining' => $this->calculateTimeRemaining($enrollment),
                'instructor' => $enrollment->course->instructor->name ?? 'Platform Instructor'
            ];
        }),
        'upcomingEvents' => $events->map(function($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $event->start_date->format('M d, Y'),
                'type' => $event->event_type,
                'participants' => $event->max_participants,
                'prize' => $event->prize_amount
            ];
        }),
        'recentAchievements' => $this->getRecentAchievements(Auth::id()),
        'categories' => CourseCategory::active()
            ->withCount(['courses' => function($query) {
                $query->published();
            }])
            ->having('courses_count', '>', 0)
            ->orderBy('name')
            ->get(),
        'featuredCourses' => $featuredCourses->map(function($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'thumbnail' => $course->thumbnail,
                'instructor' => ['name' => $course->instructor->name ?? 'Platform Instructor'],
                'course_category' => ['name' => $course->courseCategory->name],
                'price' => $course->price,
                'rating' => $course->rating,
                'enrolled_count' => $course->enrolled_count
            ];
        }),
    ]);
}

// Add these helper methods to TrainingController
private function calculateHoursLearned($enrollments)
{
    return $enrollments->sum(function($enrollment) {
        // Calculate based on progress and course duration
        $courseDuration = ($enrollment->course->duration_hours ?? 0) +
                         (($enrollment->course->duration_minutes ?? 0) / 60);
        return ($courseDuration * $enrollment->progress_percentage) / 100;
    });
}

private function calculateStreak($userId)
{
    // Use updated_at instead of last_accessed_at
    $lastAccessed = CourseEnrollment::where('user_id', $userId)
        ->whereNotNull('updated_at') // Changed from last_accessed_at
        ->orderBy('updated_at', 'desc') // Changed from last_accessed_at
        ->pluck('updated_at') // Changed from last_accessed_at
        ->map(function($date) {
            return \Carbon\Carbon::parse($date)->startOfDay();
        })
        ->unique()
        ->values();

    if ($lastAccessed->isEmpty()) {
        return 0;
    }

    $streak = 1;
    $today = now()->startOfDay();

    // Check if there's activity today or yesterday
    if ($lastAccessed->first()->diffInDays($today) > 1) {
        return 0;
    }

    // Count consecutive days
    for ($i = 1; $i < $lastAccessed->count(); $i++) {
        if ($lastAccessed[$i-1]->diffInDays($lastAccessed[$i]) === 1) {
            $streak++;
        } else {
            break;
        }
    }

    return $streak;
}

private function calculateTimeRemaining($enrollment)
{
    $courseDuration = ($enrollment->course->duration_hours ?? 0) * 60 +
                     ($enrollment->course->duration_minutes ?? 0);
    $remainingMinutes = $courseDuration * (100 - $enrollment->progress_percentage) / 100;

    $hours = floor($remainingMinutes / 60);
    $minutes = $remainingMinutes % 60;

    if ($hours > 0) {
        return "{$hours}h {$minutes}m";
    }
    return "{$minutes}m";
}

private function getRecentAchievements($userId)
{
    $achievements = [];

    // Check for completed courses
    $completedCourse = CourseEnrollment::where('user_id', $userId)
        ->where('status', 'completed')
        ->latest('completed_at')
        ->first();

    if ($completedCourse) {
        $achievements[] = [
            'title' => 'First Course Completed',
            'date' => $completedCourse->completed_at->diffForHumans(),
        ];
    }

    // Check for streak
    $streak = $this->calculateStreak($userId);
    if ($streak >= 7) {
        $achievements[] = [
            'title' => "{$streak}-Day Learning Streak",
            'date' => 'Today',
        ];
    }

    return $achievements;
}
    /**
     * Browse all available courses
    */
    public function browseCourses(Request $request)
    {
        $query = Course::published()
            ->with(['courseCategory', 'instructor', 'skillType']);

        // Apply filters
        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'LIKE', "%{$request->search}%")
                  ->orWhere('description', 'LIKE', "%{$request->search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('course_category_id', $request->category);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty_level', $request->difficulty);
        }

        if ($request->filled('skill_type')) {
            $query->where('skill_type_id', $request->skill_type);
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'featured');
        switch ($sortBy) {
            case 'newest':
                $query->orderBy('published_at', 'desc');
                break;
            case 'popular':
                $query->orderBy('enrolled_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'featured':
            default:
                $query->orderBy('is_featured', 'desc')
                      ->orderBy('rating', 'desc');
                break;
        }

        $courses = $query->paginate(12)->withQueryString();

        $categories = CourseCategory::active()->ordered()->get();
        $skillTypes = SkillType::active()->ordered()->get();
        $difficultyLevels = Course::DIFFICULTY_LEVELS;

        return Inertia::render('Training/BrowseCourses/BrowseCoursesPage', [
            'courses' => $courses,
            'categories' => $categories,
            'skillTypes' => $skillTypes,
            'difficultyLevels' => $difficultyLevels,
            'filters' => $request->only(['search', 'category', 'difficulty', 'skill_type', 'sort_by']),
        ]);
    }

    public function enroll(Course $course, Request $request)
    {
        if (!$course->is_active || $course->status !== 'published') {
            Log::error('Course enrollment failed', [
                'course_id' => $course->id,
                'reason' => 'Course is not available for enrollment'
            ]);
            return back()->with('error', 'Course is not available for enrollment.');
        }

        if ($course->isUserEnrolled(Auth::id())) {
            return back()->with('info', 'You are already enrolled in this course.');
        }

        try {
            DB::beginTransaction();

            $enrollment = CourseEnrollment::create([
                'user_id' => Auth::id(),
                'course_id' => $course->id,
                'status' => 'not_started',
                'enrolled_at' => now(),
            ]);

            $course->increment('enrolled_count');

            DB::commit();

            return redirect()
                ->route('training.course.player', $course->id)
                ->with('success', 'Successfully enrolled in ' . $course->title);

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Enrollment exception', [
                'error' => $e->getMessage(),
                'course_id' => $course->id
            ]);
            return back()->with('error', 'Enrollment failed. Please try again.');
        }
    }

    /**
     * Display user's enrolled courses
     */
       public function coursesPage(Request $request)
    {
        $query = Course::with(['courseCategory', 'skillType', 'instructor'])
                      ->published()
                      ->enrollmentOpen()
                      ->availableSpots();

        // Apply filters
        if ($request->filled('category')) {
            $query->whereHas('courseCategory', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('skill_type')) {
            $query->whereHas('skillType', function($q) use ($request) {
                $q->where('slug', $request->skill_type);
            });
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty_level', $request->difficulty);
        }

        if ($request->filled('price_type')) {
            if ($request->price_type === 'free') {
                $query->free();
            } elseif ($request->price_type === 'paid') {
                $query->paid();
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhereJsonContains('tags', $search);
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'featured');
        switch ($sortBy) {
            case 'newest':
                $query->orderBy('published_at', 'desc');
                break;
            case 'oldest':
                $query->orderBy('published_at', 'asc');
                break;
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'popular':
                $query->orderBy('enrolled_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'featured':
            default:
                $query->orderBy('is_featured', 'desc')
                      ->orderBy('rating', 'desc')
                      ->orderBy('enrolled_count', 'desc');
                break;
        }

        $courses = $query->paginate(12);

        // Get filter options
        $categories = CourseCategory::active()->ordered()->get();
        $skillTypes = SkillType::active()->ordered()->get();
        $difficultyLevels = Course::DIFFICULTY_LEVELS;

        // Get featured courses
        $featuredCourses = Course::published()
                                ->featured()
                                ->limit(6)
                                ->get();

        // Get user's enrolled courses if authenticated
        $enrolledCourses = null;
        if (Auth::check()) {
            $enrolledCourses = CourseEnrollment::with(['course.courseCategory'])
                                             ->byUser(Auth::id())
                                             ->active()
                                             ->latest()
                                             ->limit(5)
                                             ->get();
        }

        return Inertia::render('Training/Courses/CoursesPage', [
            'courses' => $courses,
            'categories' => $categories,
            'skill_types' => $skillTypes,
            'difficulty_levels' => $difficultyLevels,
            'featured_courses' => $featuredCourses,
            'enrolled_courses' => $enrolledCourses,
            'filters' => $request->only(['category', 'skill_type', 'difficulty', 'price_type', 'search', 'sort_by'])
        ]);
    }


    public function myCourses(Request $request)
    {
        $enrollments = CourseEnrollment::with([
            'course.courseCategory',
            'course.instructor'
        ])
        ->byUser(Auth::id())
        ->orderBy('updated_at', 'desc')
        ->paginate(12);
        // dd($enrollments);

        return Inertia::render('Training/Courses/MyCoursesPage', [
            'enrolledCourses' => $enrollments,
            'filters' => $request->only(['status']),
        ]);
    }


    /**
     * Update course progress
     */
   public function updateProgress(CourseEnrollment $enrollment, Request $request)
{
    $request->validate([
        'progress_percentage' => 'required|integer|min:0|max:100',
    ]);

    if ($enrollment->user_id !== Auth::id()) {
        abort(403);
    }

    try {
        $enrollment->update([
            'progress_percentage' => $request->progress_percentage,
            'current_module_id' => $request->current_module_id,
            'last_accessed_at' => now(), // This will now work
        ]);

        // Update status based on progress
        if ($request->progress_percentage >= 100) {
            $enrollment->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);
        } elseif ($request->progress_percentage > 0) {
            $enrollment->update(['status' => 'in_progress']);
        }

        return response()->json([
            'message' => 'Progress updated successfully',
            'enrollment' => $enrollment->fresh()
        ]);

    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to update progress'], 500);
    }
}

    public function registerEvent(Event $event, Request $request)
{
    if (!Auth::check()) {
        return redirect()->route('login');
    }

    // Check if already registered
    $existingRegistration = $event->registrations()
        ->where('user_id', Auth::id())
        ->first();

    if ($existingRegistration) {
        return redirect()->back()->with('info', 'You are already registered for this event.');
    }

    try {
        DB::beginTransaction();

        $registration = $event->registrations()->create([
            'user_id' => Auth::id(),
            'status' => 'registered',
            'registered_at' => now(),
        ]);

        DB::commit();

        return redirect()->back()->with('success', 'Successfully registered for ' . $event->title);

    } catch (\Exception $e) {
        DB::rollback();
        return redirect()->back()->with('error', 'Registration failed. Please try again.');
    }
}

    /**
     * Display events page
    */
    public function events(Request $request)
    {
        $events = Event::upcoming()
            ->with(['registrations' => function($query) {
                $query->where('user_id', Auth::id());
            }])
            ->orderBy('start_date')
            ->paginate(12);

        $userRegistrations = Auth::user()->eventRegistrations()->pluck('event_id');

        return Inertia::render('Training/Events/Index', [
            'events' => $events,
            'userRegistrations' => $userRegistrations,
            'filters' => $request->only(['type', 'status']),
        ]);
    }

  public function certificates()
{
    $certificates = CourseEnrollment::with(['course.courseCategory', 'course.instructor'])
        ->byUser(Auth::id())
        ->completed()
        ->orderBy('completed_at', 'desc')
        ->get();

    return Inertia::render('Training/Certificates/Index', [ // Changed from Detail
        'certificates' => $certificates,
    ]);
}

public function showCertificate($enrollmentId)
{
    $enrollment = CourseEnrollment::with(['course.courseCategory', 'course.instructor', 'user'])
        ->where('id', $enrollmentId)
        ->where('user_id', Auth::id())
        ->where('status', 'completed')
        ->firstOrFail();

    // Generate certificate data
    $certificateData = [
        'certificate_id' => 'CERT-' . str_pad($enrollment->id, 8, '0', STR_PAD_LEFT),
        'student_name' => $enrollment->user->name,
        'course_name' => $enrollment->course->title,
        'completion_date' => $enrollment->completed_at->format('F d, Y'),
        'instructor_name' => $enrollment->course->instructor->name ?? 'Platform Instructor',
        'course_hours' => $enrollment->course->duration_hours,
        'score' => 100, // You can calculate actual score based on quiz results
        'verification_url' => route('training.certificate.verify', $enrollment->id),
    ];

    return Inertia::render('Training/Certificates/Detail', [
        'enrollment' => $enrollment,
        'certificateData' => $certificateData,
    ]);
}

// Add verification endpoint
public function verifyCertificate($enrollmentId)
{
    $enrollment = CourseEnrollment::with(['course', 'user'])
        ->where('id', $enrollmentId)
        ->where('status', 'completed')
        ->first();

    if (!$enrollment) {
        return response()->json([
            'valid' => false,
            'message' => 'Certificate not found or invalid'
        ], 404);
    }

    return response()->json([
        'valid' => true,
        'student_name' => $enrollment->user->name,
        'course_name' => $enrollment->course->title,
        'completion_date' => $enrollment->completed_at->format('F d, Y'),
        'certificate_id' => 'CERT-' . str_pad($enrollment->id, 8, '0', STR_PAD_LEFT),
    ]);
}
}
