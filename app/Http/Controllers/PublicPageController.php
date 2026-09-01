<?php

namespace App\Http\Controllers;

use App\Models\ChurchMediaContent;
use App\Models\ChurchMinistry;
use App\Models\ChurchPrayerRequest;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    // About NYP Institution Pages
    public function about()
    {
        return Inertia::render('Public/About', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function leadership()
    {
        return Inertia::render('Public/Leadership', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function governance()
    {
        return Inertia::render('Public/Governance', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function zones()
    {
        return Inertia::render('Public/Zones', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function mission()
    {
        return Inertia::render('Public/Mission', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // APGA Worldwide Program Pages
    public function program()
    {
        return Inertia::render('Public/Program', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function partners()
    {
        return Inertia::render('Public/Partners', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function funding()
    {
        return Inertia::render('Public/Funding', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function owopMandate()
    {
        return Inertia::render('Public/OwopMandate', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function ecosystem()
    {
        return Inertia::render('Public/Ecosystem', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function impact()
    {
        return Inertia::render('Public/Impact', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // Documentation Pages
    public function whitepaper()
    {
        return Inertia::render('Public/Documentation/Whitepaper', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function policy()
    {
        return Inertia::render('Public/Documentation/Policy', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function fundingFramework()
    {
        return Inertia::render('Public/Documentation/FundingFramework', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function infrastructure()
    {
        return Inertia::render('Public/Documentation/Infrastructure', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function specs()
    {
        return Inertia::render('Public/Documentation/Specs', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // Resources & Community Pages
    public function community()
    {
        return Inertia::render('Public/Community', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function ministries()
    {
        $ministries = ChurchMinistry::query()
            ->with(['leadershipProfiles' => function ($query) {
                $query->where('is_active', true)->orderBy('name');
            }])
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Ministries', [
            'laravelVersion' => Application::VERSION,
            'ministries' => $ministries,
        ]);
    }

    public function ministryDetail(ChurchMinistry $ministry)
    {
        $ministry->load(['leadershipProfiles' => function ($query) {
            $query->where('is_active', true)->orderBy('name');
        }]);

        return Inertia::render('Public/MinistryDetail', [
            'laravelVersion' => Application::VERSION,
            'ministry' => $ministry,
        ]);
    }

    public function media()
    {
        $media = ChurchMediaContent::query()
            ->where('status', 'published')
            ->orderByDesc('featured')
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('Public/Media', [
            'laravelVersion' => Application::VERSION,
            'media' => $media,
            'featuredMedia' => $media->where('featured', true)->take(3),
        ]);
    }

    public function mediaDetail(ChurchMediaContent $media)
    {
        $relatedMedia = ChurchMediaContent::query()
            ->where('id', '!=', $media->id)
            ->where('status', 'published')
            ->when($media->content_type, fn ($query) => $query->where('content_type', $media->content_type))
            ->orderByDesc('published_at')
            ->limit(3)
            ->get();

        if ($relatedMedia->isEmpty()) {
            $relatedMedia = ChurchMediaContent::query()
                ->where('id', '!=', $media->id)
                ->where('status', 'published')
                ->orderByDesc('published_at')
                ->limit(3)
                ->get();
        }

        return Inertia::render('Public/MediaDetail', [
            'laravelVersion' => Application::VERSION,
            'media' => $media,
            'relatedMedia' => $relatedMedia,
        ]);
    }

    public function events()
    {
        $events = Event::query()
            ->where('start_date', '>=', now()->startOfDay())
            ->whereIn('status', ['upcoming', 'registration_open', 'ongoing'])
            ->orderBy('start_date')
            ->get();

        return Inertia::render('Public/Events', [
            'laravelVersion' => Application::VERSION,
            'events' => $events,
        ]);
    }

    public function eventDetail(Event $event)
    {
        $relatedEvents = Event::query()
            ->where('id', '!=', $event->id)
            ->where('start_date', '>=', now()->startOfDay())
            ->whereIn('status', ['upcoming', 'registration_open', 'ongoing'])
            ->orderBy('start_date')
            ->limit(3)
            ->get();

        return Inertia::render('Public/EventDetail', [
            'laravelVersion' => Application::VERSION,
            'event' => $event,
            'relatedEvents' => $relatedEvents,
            'isRegistered' => Auth::check() && $event->registrations()->where('user_id', Auth::id())->exists(),
        ]);
    }

    public function registerEvent(Event $event, Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        if ($event->registrations()->where('user_id', Auth::id())->exists()) {
            return redirect()->route('events.detail', $event)->with('info', 'You are already registered for this event.');
        }

        EventRegistration::create([
            'user_id' => Auth::id(),
            'event_id' => $event->id,
            'status' => 'registered',
            'registered_at' => now(),
        ]);

        return redirect()->route('events.detail', $event)->with('success', 'You have successfully registered for ' . $event->title . '.');
    }

    public function storePrayerRequest(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'request_type' => ['required', 'in:healing,thanksgiving,guidance,deliverance,other'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
            'is_public' => ['nullable', 'boolean'],
        ]);

        ChurchPrayerRequest::create([
            'user_id' => $request->user()?->id,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'] ?? $request->user()?->email,
            'request_type' => $validated['request_type'],
            'message' => $validated['message'],
            'is_public' => (bool) ($validated['is_public'] ?? false),
            'status' => 'pending',
        ]);

        return redirect()->route('media')->with('success', 'Your prayer request has been received and will be lifted in prayer.');
    }

    public function knowledgeBase()
    {
        return Inertia::render('Public/KnowledgeBase', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function support()
    {
        return Inertia::render('Public/Support', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function faq()
    {
        return Inertia::render('Public/FAQ', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function feedback()
    {
        return Inertia::render('Public/Feedback', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // Legal & Compliance Pages
    public function privacy()
    {
        return Inertia::render('Public/Legal/Privacy', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function terms()
    {
        return Inertia::render('Public/Legal/Terms', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function cookies()
    {
        return Inertia::render('Public/Legal/Cookies', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function disclaimer()
    {
        return Inertia::render('Public/Legal/Disclaimer', [
            'laravelVersion' => Application::VERSION,
        ]);
    }
}
