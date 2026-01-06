<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\CourseEnrollment;
use App\Models\LectureProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display course player with document/slide support
     */
    public function coursePlayer(Course $course, Request $request)
    {
        $enrollment = CourseEnrollment::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->firstOrFail();

        $sections = $course->sections()
            ->with(['lectures' => function($query) {
                $query->orderBy('order');
            }])
            ->orderBy('order')
            ->get();

        $userId = Auth::id();
        $sections = $sections->map(function($section) use ($userId) {
            $section->lectures = $section->lectures->map(function($lecture) use ($userId) {
                $progress = LectureProgress::where('user_id', $userId)
                    ->where('course_lecture_id', $lecture->id)
                    ->first();

                $lecture->is_completed = $progress ? $progress->is_completed : false;
                $lecture->is_locked = $this->isLectureLocked($lecture, $userId);
                $lecture->duration = $this->formatDuration($lecture->duration_minutes);

                // Process slides and documents
                $lecture = $this->processLectureMedia($lecture);

                return $lecture;
            });
            return $section;
        });

        $currentLecture = null;
        if ($request->has('lecture')) {
            $currentLecture = CourseLecture::find($request->lecture);
            if ($currentLecture) {
                $progress = LectureProgress::where('user_id', $userId)
                    ->where('course_lecture_id', $currentLecture->id)
                    ->first();

                $currentLecture->is_completed = $progress ? $progress->is_completed : false;
                $currentLecture->is_locked = $this->isLectureLocked($currentLecture, $userId);
                $currentLecture->duration = $this->formatDuration($currentLecture->duration_minutes);
                $currentLecture = $this->processLectureMedia($currentLecture);
            }
        } else {
            $currentLecture = $this->getNextIncompleteLecture($sections, $userId);
        }

        $enrollment->update(['last_accessed_at' => now()]);

        return Inertia::render('Training/Courses/CoursePlayer', [
            'course' => $course->load(['courseCategory', 'instructor']),
            'enrollment' => $enrollment->fresh(),
            'sections' => $sections,
            'currentLecture' => $currentLecture,
        ]);
    }

    /**
     * Show course detail page
     */
    public function courseDetail($id)
    {
        $course = Course::with([
            'courseCategory',
            'instructor',
            'sections.lectures',
            'reviews.user'
        ])->findOrFail($id);

        $userId = Auth::id();
        $enrollment = $userId ? CourseEnrollment::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->first() : null;

        $isEnrolled = (bool) $enrollment;
        $userProgress = $enrollment?->progress_percentage ?? 0;

        // Calculate rating and review statistics
        $reviews = $course->reviews ?? [];
        $reviewCount = count($reviews);
        $averageRating = $reviewCount > 0 ? $reviews->avg('rating') : 0;
        $reviewDistribution = [
            5 => $reviews->where('rating', 5)->count(),
            4 => $reviews->where('rating', 4)->count(),
            3 => $reviews->where('rating', 3)->count(),
            2 => $reviews->where('rating', 2)->count(),
            1 => $reviews->where('rating', 1)->count(),
        ];

        return Inertia::render('Training/Courses/CourseDetailPage', [
            'course' => array_merge($course->toArray(), [
                'rating' => $averageRating,
                'reviews_count' => $reviewCount,
                'review_distribution' => $reviewDistribution,
            ]),
            'isEnrolled' => $isEnrolled,
            'userProgress' => $userProgress,
            'backUrl' => route('training.courses'),
        ]);
    }

    /**
     * Process lecture media (slides, documents, PDFs)
     */
    private function processLectureMedia(CourseLecture $lecture): CourseLecture
    {
        // Handle slide type
        if ($lecture->type === 'slide') {
            if (is_string($lecture->resources)) {
                $resources = json_decode($lecture->resources, true);
                $lecture->slides = $this->processSlideUrls($resources['slides'] ?? []);
            } elseif (is_array($lecture->resources)) {
                $lecture->slides = $this->processSlideUrls($lecture->resources['slides'] ?? []);
            }
        }

        // Handle document/PDF types
        if (in_array($lecture->type, ['document', 'pdf'])) {
            if ($lecture->video_url) {
                // Document URL is stored in video_url field
                $lecture->document_url = $this->getDocumentUrl($lecture->video_url);
            } elseif ($lecture->resources) {
                $resources = is_string($lecture->resources)
                    ? json_decode($lecture->resources, true)
                    : $lecture->resources;

                if (isset($resources['document_url'])) {
                    $lecture->document_url = $this->getDocumentUrl($resources['document_url']);
                }
            }
        }

        // Parse additional resources
        if ($lecture->resources) {
            $resources = is_string($lecture->resources)
                ? json_decode($lecture->resources, true)
                : $lecture->resources;

            $lecture->parsed_resources = [
                'slides' => $this->processSlideUrls($resources['slides'] ?? []),
                'documents' => $this->processDocuments($resources['documents'] ?? []),
                'downloads' => $resources['downloads'] ?? []
            ];
        }

        return $lecture;
    }

    /**
     * Process slide URLs (convert storage paths to public URLs)
     */
    private function processSlideUrls(array $slides): array
    {
        return array_map(function($slide) {
            // Slide may be a string (path or URL) or an array with keys like 'url' or 'path'
            $path = '';
            if (is_array($slide)) {
                $path = $slide['url'] ?? $slide['path'] ?? $slide['storage_path'] ?? ($slide[0] ?? '');
            } else {
                $path = $slide ?? '';
            }

            $path = (string) $path;

            if ($path === '') {
                return '';
            }

            // If it's already a full URL, return as is
            if (filter_var($path, FILTER_VALIDATE_URL)) {
                return $path;
            }

            // If it's a storage path, convert to URL
            if (is_string($path) && Storage::disk('public')->exists($path)) {
                return Storage::disk('public')->url($path);
            }

            // Return as asset path (trim leading slashes)
            return asset('storage/' . ltrim($path, '/'));
        }, $slides);
    }

    /**
     * Process document URLs
     */
    private function processDocuments(array $documents): array
    {
        return array_map(function($doc) {
            if (is_string($doc)) {
                return [
                    'name' => basename($doc),
                    'url' => $this->getDocumentUrl($doc),
                    'type' => $this->getFileExtension($doc)
                ];
            }

            // If doc is an array, try to extract common keys
            $url = $doc['url'] ?? $doc['path'] ?? $doc['storage_path'] ?? '';
            $name = $doc['name'] ?? basename($url) ?: ($doc['title'] ?? 'Document');
            $type = $doc['type'] ?? $this->getFileExtension($url);

            return [
                'name' => $name,
                'url' => $this->getDocumentUrl($url),
                'type' => $type
            ];
        }, $documents);
    }

    /**
     * Get full document URL
     */
    /**
     * Get full document URL (accepts string path or empty)
     *
     * @param mixed $path
     * @return string
     */
    private function getDocumentUrl($path): string
    {
        $path = (string) ($path ?? '');

        if ($path === '') {
            return '';
        }

        // If it's already a full URL, return as is
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        // If it's a storage path, convert to URL
        if (is_string($path) && Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }

        // Return as asset path (trim leading slashes)
        return asset('storage/' . ltrim($path, '/'));
    }

    /**
     * Get file extension
     */
    private function getFileExtension(string $path): string
    {
        return strtolower(pathinfo($path, PATHINFO_EXTENSION));
    }

    /**
     * Upload slides for a lecture
     */
    public function uploadSlides(Request $request, CourseLecture $lecture)
    {
        $request->validate([
            'slides' => 'required|array|min:1',
            'slides.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120' // 5MB max
        ]);

        try {
            DB::beginTransaction();

            $uploadedSlides = [];
            foreach ($request->file('slides') as $index => $slide) {
                $path = $slide->store('courses/slides/' . $lecture->section->course_id, 'public');
                $uploadedSlides[] = $path;
            }

            // Update lecture resources
            $resources = $lecture->resources ?? [];
            $resources['slides'] = $uploadedSlides;

            $lecture->update([
                'type' => 'slide',
                'resources' => $resources
            ]);

            DB::commit();

            return back()->with('success', count($uploadedSlides) . ' slides uploaded successfully');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Failed to upload slides', [
                'error' => $e->getMessage(),
                'lecture_id' => $lecture->id
            ]);
            return back()->with('error', 'Failed to upload slides');
        }
    }

    /**
     * Upload document for a lecture
     */
    public function uploadDocument(Request $request, CourseLecture $lecture)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,doc,docx,ppt,pptx,xls,xlsx|max:10240', // 10MB max
            'document_type' => 'required|in:pdf,document'
        ]);

        try {
            DB::beginTransaction();

            $document = $request->file('document');
            $path = $document->store('courses/documents/' . $lecture->section->course_id, 'public');

            // Update lecture
            $lecture->update([
                'type' => $request->document_type,
                'video_url' => $path, // Store document path in video_url field
            ]);

            DB::commit();

            return back()->with('success', 'Document uploaded successfully');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Failed to upload document', [
                'error' => $e->getMessage(),
                'lecture_id' => $lecture->id
            ]);
            return back()->with('error', 'Failed to upload document');
        }
    }

    /**
     * Delete slide from lecture
     */
    public function deleteSlide(Request $request, CourseLecture $lecture)
    {
        $request->validate([
            'slide_index' => 'required|integer|min:0'
        ]);

        try {
            DB::beginTransaction();

            $resources = $lecture->resources ?? [];
            $slides = $resources['slides'] ?? [];

            if (isset($slides[$request->slide_index])) {
                // Delete file from storage
                $slidePath = $slides[$request->slide_index];
                if (Storage::disk('public')->exists($slidePath)) {
                    Storage::disk('public')->delete($slidePath);
                }

                // Remove from array
                array_splice($slides, $request->slide_index, 1);
                $resources['slides'] = array_values($slides); // Re-index array

                $lecture->update(['resources' => $resources]);
            }

            DB::commit();

            return back()->with('success', 'Slide deleted successfully');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Failed to delete slide', [
                'error' => $e->getMessage(),
                'lecture_id' => $lecture->id
            ]);
            return back()->with('error', 'Failed to delete slide');
        }
    }

    /**
     * Bulk upload slides via URLs
     */
    public function uploadSlideUrls(Request $request, CourseLecture $lecture)
    {
        $request->validate([
            'slide_urls' => 'required|array|min:1',
            'slide_urls.*' => 'required|url'
        ]);

        try {
            DB::beginTransaction();

            $resources = $lecture->resources ?? [];
            $existingSlides = $resources['slides'] ?? [];

            // Add new URLs to existing slides
            $allSlides = array_merge($existingSlides, $request->slide_urls);
            $resources['slides'] = $allSlides;

            $lecture->update([
                'type' => 'slide',
                'resources' => $resources
            ]);

            DB::commit();

            return back()->with('success', count($request->slide_urls) . ' slide URLs added successfully');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Failed to add slide URLs', [
                'error' => $e->getMessage(),
                'lecture_id' => $lecture->id
            ]);
            return back()->with('error', 'Failed to add slide URLs');
        }
    }

    /**
     * Helper: Check if lecture is locked
     */
    private function isLectureLocked(CourseLecture $lecture, int $userId): bool
    {
        $previousLecture = CourseLecture::where('course_section_id', $lecture->course_section_id)
            ->where('order', '<', $lecture->order)
            ->orderBy('order', 'desc')
            ->first();

        if (!$previousLecture) {
            return false;
        }

        $progress = LectureProgress::where('user_id', $userId)
            ->where('course_lecture_id', $previousLecture->id)
            ->first();

        return !($progress && $progress->is_completed);
    }

    /**
     * Helper: Get next incomplete lecture
     */
    private function getNextIncompleteLecture($sections, int $userId): ?CourseLecture
    {
        foreach ($sections as $section) {
            foreach ($section->lectures as $lecture) {
                if (!$lecture->is_completed && !$lecture->is_locked) {
                    return $lecture;
                }
            }
        }

        return $sections[0]->lectures[0] ?? null;
    }

    /**
     * Helper: Format duration
     */
    private function formatDuration(int $minutes): string
    {
        if ($minutes < 60) {
            return "{$minutes}m";
        }

        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;

        if ($remainingMinutes === 0) {
            return "{$hours}h";
        }

        return "{$hours}h {$remainingMinutes}m";
    }

    /**
     * Complete lecture (for all types including slides/docs)
     */
    public function completeLecture(Course $course, CourseLecture $lecture, Request $request)
    {
        // Validate that the lecture belongs to this course
        $section = $lecture->section;
        if ($section->course_id !== $course->id) {
            abort(403, 'Invalid lecture for this course');
        }

        // Check if user is enrolled in the course
        $enrollment = CourseEnrollment::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            abort(403, 'Not enrolled in this course');
        }

        try {
            DB::beginTransaction();

            $progress = LectureProgress::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'course_lecture_id' => $lecture->id
                ],
                [
                    'is_completed' => true,
                    'completed_at' => now(),
                    'progress_percentage' => 100
                ]
            );

            $this->updateCourseProgress($course, Auth::id());

            DB::commit();

            // Return Inertia response (not plain JSON)
            return back()->with('success', 'Lecture marked as complete');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Failed to mark lecture complete', [
                'error' => $e->getMessage(),
                'lecture_id' => $lecture->id,
                'user_id' => Auth::id()
            ]);
            return back()->with('error', 'Failed to update progress');
        }
    }

    /**
     * Helper: Update course progress
     */
    private function updateCourseProgress(Course $course, int $userId): void
    {
        $totalLectures = CourseLecture::whereHas('section', function($query) use ($course) {
            $query->where('course_id', $course->id);
        })->count();

        if ($totalLectures === 0) {
            return;
        }

        $completedLectures = LectureProgress::where('user_id', $userId)
            ->where('is_completed', true)
            ->whereIn('course_lecture_id', function($query) use ($course) {
                $query->select('course_lectures.id')
                    ->from('course_lectures')
                    ->join('course_sections', 'course_lectures.course_section_id', '=', 'course_sections.id')
                    ->where('course_sections.course_id', $course->id);
            })
            ->count();

        $progressPercentage = round(($completedLectures / $totalLectures) * 100);

        $status = 'not_started';
        if ($progressPercentage >= 100) {
            $status = 'completed';
        } elseif ($progressPercentage > 0) {
            $status = 'in_progress';
        }

        $enrollment = CourseEnrollment::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->first();

        if ($enrollment) {
            $enrollment->update([
                'progress_percentage' => $progressPercentage,
                'status' => $status,
                'completed_at' => $progressPercentage >= 100 ? now() : null,
                'last_accessed_at' => now()
            ]);
        }
    }

    /**
     * Toggle course as favourite
     */
    public function toggleFavourite(Course $course)
    {
        $userId = Auth::id();

        $favourite = \App\Models\CourseFavourite::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->first();

        if ($favourite) {
            // Remove from favourites
            $favourite->delete();
            $isFavourited = false;
        } else {
            // Add to favourites
            \App\Models\CourseFavourite::create([
                'user_id' => $userId,
                'course_id' => $course->id,
            ]);
            $isFavourited = true;
        }

        return response()->json([
            'success' => true,
            'is_favourited' => $isFavourited,
            'message' => $isFavourited ? 'Added to favourites' : 'Removed from favourites'
        ]);
    }

    /**
     * Get user's favourite courses
     */
    public function getFavourites()
    {
        $userId = Auth::id();

        $favourites = \App\Models\CourseFavourite::where('user_id', $userId)
            ->pluck('course_id')
            ->toArray();

        return response()->json([
            'success' => true,
            'favourites' => $favourites
        ]);
    }
}

