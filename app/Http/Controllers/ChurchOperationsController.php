<?php

namespace App\Http\Controllers;

use App\Models\ChurchAbsentee;
use App\Models\ChurchAnnouncement;
use App\Models\ChurchContactMessage;
use App\Models\ChurchLeadershipProfile;
use App\Models\ChurchMediaContent;
use App\Models\ChurchMinistry;
use App\Models\ChurchPrayerRequest;
use App\Models\ChurchReport;
use App\Models\ChurchScorecard;
use App\Models\ChurchUnit;
use App\Models\ChurchUnitLeader;
use App\Models\ChurchUnitMember;
use App\Models\ChurchWorkersMeeting;
use App\Models\Event;
use App\Notifications\ContactMessageResolved;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChurchOperationsController extends Controller
{
    public function ministries(Request $request)
    {
        $ministries = ChurchMinistry::query()
            ->orderByDesc('is_active')
            ->orderBy('name')
            ->get();

        return Inertia::render('Church/MinistryManagement', [
            'ministries' => $ministries,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeMinistry(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'leader_name' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        ChurchMinistry::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'leader_name' => $validated['leader_name'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('church-admin.ministries')->with('success', 'Ministry created successfully.');
    }

    public function churchUnits(Request $request)
    {
        $units = ChurchUnit::query()
            ->with(['leaders', 'members'])
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        return Inertia::render('Church/UnitManagement', [
            'units' => $units,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeChurchUnit(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'aim' => ['nullable', 'string'],
            'objectives' => ['nullable', 'string'],
            'duties' => ['nullable', 'string'],
            'highlights' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $slug = str($validated['name'])
            ->slug()
            ->toString();

        $unit = ChurchUnit::query()->firstOrCreate(
            ['slug' => $slug],
            [
                'name' => $validated['name'],
                'category' => $validated['category'],
                'summary' => $validated['summary'] ?? null,
                'aim' => $validated['aim'] ?? null,
                'objectives' => $this->parseList($validated['objectives'] ?? ''),
                'duties' => $this->parseList($validated['duties'] ?? ''),
                'highlights' => $this->parseList($validated['highlights'] ?? ''),
                'is_active' => (bool) ($validated['is_active'] ?? true),
            ]
        );

        return redirect()->route('church-admin.units')->with('success', $unit->wasRecentlyCreated ? 'Church unit created successfully.' : 'Church unit saved successfully.');
    }

    public function storeUnitLeader(Request $request, ChurchUnit $unit)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        ChurchUnitLeader::create([
            'church_unit_id' => $unit->id,
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('church-admin.units')->with('success', 'Unit leader added successfully.');
    }

    public function storeUnitMember(Request $request, ChurchUnit $unit)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        ChurchUnitMember::create([
            'church_unit_id' => $unit->id,
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('church-admin.units')->with('success', 'Unit member added successfully.');
    }

    public function leadership(Request $request)
    {
        $leadership = ChurchLeadershipProfile::with('ministry')
            ->orderBy('name')
            ->get();

        $ministries = ChurchMinistry::query()->orderBy('name')->get();

        return Inertia::render('Church/LeadershipProfiles', [
            'leadership' => $leadership,
            'ministries' => $ministries,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeLeadership(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'ministry_id' => ['nullable', 'exists:church_ministries,id'],
            'bio' => ['nullable', 'string'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        ChurchLeadershipProfile::create([
            'church_ministry_id' => $validated['ministry_id'] ?? null,
            'name' => $validated['name'],
            'title' => $validated['title'],
            'bio' => $validated['bio'] ?? null,
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('church-admin.leadership')->with('success', 'Leadership profile created successfully.');
    }

    public function reports(Request $request)
    {
        $periodType = $request->validate([
            'period_type' => ['nullable', 'in:all,weekly,monthly,quarterly,annual'],
        ])['period_type'] ?? 'all';

        $reportsQuery = ChurchReport::query()
            ->orderByDesc('report_date');

        if ($periodType !== 'all') {
            $reportsQuery->where('period_type', $periodType);
        }

        return Inertia::render('Church/ReportsDashboard', [
            'reports' => $reportsQuery->get(),
            'periodType' => $periodType,
            'analyticsLabels' => [
                'attendanceTrend' => 'Attendance trend',
                'weeklyGrowth' => 'Weekly growth',
                'strongestPeriod' => 'Strongest period',
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function prayerRequests(Request $request)
    {
        $prayerRequests = ChurchPrayerRequest::query()
            ->latest()
            ->get();

        return Inertia::render('Church/PrayerRequestsBoard', [
            'prayerRequests' => $prayerRequests,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function announcements(Request $request)
    {
        return Inertia::render('Church/AnnouncementsBoard', [
            'announcements' => ChurchAnnouncement::query()->latest('published_at')->latest()->get(),
            'flash' => ['success' => $request->session()->get('success')],
        ]);
    }

    public function storeAnnouncement(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'published_at' => ['nullable', 'date'],
            'status' => ['required', 'in:draft,published,archived'],
        ]);

        ChurchAnnouncement::create($validated);

        return redirect()->route('church-admin.announcements')->with('success', 'Announcement saved successfully.');
    }

    public function updatePrayerRequestStatus(Request $request, ChurchPrayerRequest $prayerRequest)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,prayed,closed'],
        ]);

        $prayerRequest->update(['status' => $validated['status']]);

        return redirect()->route('church-admin.prayer-requests')->with('success', 'Prayer request status updated successfully.');
    }

    private function parseList(string $value): array
    {
        $lines = preg_split('/\r\n|\n|\r/', trim($value));

        if (!$lines) {
            return [];
        }

        return collect($lines)
            ->map(fn ($line) => trim((string) $line))
            ->filter(fn ($line) => $line !== '')
            ->values()
            ->all();
    }

    public function storeReport(Request $request)
    {
        $validated = $request->validate([
            'period_type' => ['required', 'in:weekly,monthly,quarterly,annual'],
            'title' => ['required', 'string', 'max:255'],
            'report_date' => ['required', 'date'],
            'summary' => ['nullable', 'string'],
            'attendance_count' => ['nullable', 'integer', 'min:0'],
            'first_timers_count' => ['nullable', 'integer', 'min:0'],
            'new_members_count' => ['nullable', 'integer', 'min:0'],
            'prayer_requests_count' => ['nullable', 'integer', 'min:0'],
        ]);

        ChurchReport::create([
            'period_type' => $validated['period_type'],
            'title' => $validated['title'],
            'report_date' => $validated['report_date'],
            'summary' => $validated['summary'] ?? null,
            'attendance_count' => (int) ($validated['attendance_count'] ?? 0),
            'first_timers_count' => (int) ($validated['first_timers_count'] ?? 0),
            'new_members_count' => (int) ($validated['new_members_count'] ?? 0),
            'prayer_requests_count' => (int) ($validated['prayer_requests_count'] ?? 0),
        ]);

        return redirect()->route('church-admin.reports')->with('success', 'Church report created successfully.');
    }

    public function scorecards(Request $request)
    {
        $scorecards = ChurchScorecard::query()
            ->orderByDesc('report_date')
            ->get();

        return Inertia::render('Church/ScorecardsDashboard', [
            'scorecards' => $scorecards,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeScorecard(Request $request)
    {
        $validated = $request->validate([
            'period_type' => ['required', 'in:weekly,monthly,quarterly,annual'],
            'title' => ['required', 'string', 'max:255'],
            'report_date' => ['required', 'date'],
            'invitation_count' => ['nullable', 'integer', 'min:0'],
            'new_visitors_count' => ['nullable', 'integer', 'min:0'],
            'conversion_count' => ['nullable', 'integer', 'min:0'],
            'score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        ChurchScorecard::create([
            'period_type' => $validated['period_type'],
            'title' => $validated['title'],
            'report_date' => $validated['report_date'],
            'invitation_count' => (int) ($validated['invitation_count'] ?? 0),
            'new_visitors_count' => (int) ($validated['new_visitors_count'] ?? 0),
            'conversion_count' => (int) ($validated['conversion_count'] ?? 0),
            'score' => (int) ($validated['score'] ?? 0),
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('church-admin.scorecards')->with('success', 'Church scorecard created successfully.');
    }

    public function absentees(Request $request)
    {
        $absentees = ChurchAbsentee::query()
            ->orderByDesc('service_date')
            ->get();

        return Inertia::render('Church/AbsenteeBoard', [
            'absentees' => $absentees,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeAbsentee(Request $request)
    {
        $validated = $request->validate([
            'member_name' => ['required', 'string', 'max:255'],
            'reason' => ['nullable', 'string'],
            'service_type' => ['required', 'string', 'max:50'],
            'service_date' => ['required', 'date'],
            'status' => ['required', 'in:absent,excused,late'],
        ]);

        ChurchAbsentee::create([
            'member_name' => $validated['member_name'],
            'reason' => $validated['reason'] ?? null,
            'service_type' => $validated['service_type'],
            'service_date' => $validated['service_date'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('church-admin.absentees')->with('success', 'Absentee record saved successfully.');
    }

    public function workersMeetings(Request $request)
    {
        $meetings = ChurchWorkersMeeting::query()
            ->orderByDesc('meeting_date')
            ->get();

        return Inertia::render('Church/WorkersMeetingBoard', [
            'meetings' => $meetings,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeWorkersMeeting(Request $request)
    {
        $validated = $request->validate([
            'topic' => ['required', 'string', 'max:255'],
            'meeting_date' => ['required', 'date'],
            'leader_name' => ['required', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'status' => ['required', 'in:scheduled,completed,cancelled'],
        ]);

        ChurchWorkersMeeting::create([
            'topic' => $validated['topic'],
            'meeting_date' => $validated['meeting_date'],
            'leader_name' => $validated['leader_name'],
            'summary' => $validated['summary'] ?? null,
            'status' => $validated['status'],
        ]);

        return redirect()->route('church-admin.workers-meetings')->with('success', 'Workers meeting saved successfully.');
    }

    public function media(Request $request)
    {
        $media = ChurchMediaContent::query()
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('Church/MediaContentBoard', [
            'media' => $media,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function messages(Request $request)
    {
        return Inertia::render('Church/MessagesBoard', [
            'messages' => ChurchContactMessage::query()->latest()->get(),
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function updateMessageStatus(Request $request, ChurchContactMessage $message)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:open,resolved'],
        ]);

        $wasResolved = $message->status === 'resolved';
        $message->update(['status' => $validated['status']]);

        if (!$wasResolved && $message->status === 'resolved' && $message->user) {
            $message->user->notify(new ContactMessageResolved($message));
        }

        return redirect()->route('church-admin.messages')->with('success', 'Message status updated successfully.');
    }

    public function memberMessages(Request $request)
    {
        return Inertia::render('Member/Messages', [
            'messages' => $request->user()->churchContactMessages()->latest()->get(),
        ]);
    }

    public function events(Request $request)
    {
        $events = Event::query()
            ->with('registrations.user')
            ->orderBy('start_date')
            ->get()
            ->map(function (Event $event) {
                $event->registration_summary = $event->registrations
                    ->groupBy('status')
                    ->map(fn ($registrations) => $registrations->count())
                    ->all();
                $event->registrants = $event->registrations
                    ->sortBy('registered_at')
                    ->map(fn ($registration) => [
                        'name' => $registration->user?->name ?? 'Unknown member',
                        'email' => $registration->user?->email,
                        'status' => $registration->status,
                    ])
                    ->values()
                    ->all();

                return $event;
            });

        return Inertia::render('Church/EventManagement', [
            'events' => $events,
            'flash' => ['success' => $request->session()->get('success')],
        ]);
    }

    public function storeEvent(Request $request)
    {
        $validated = $request->validate($this->eventValidationRules());

        Event::create([
            ...$validated,
            'is_virtual' => (bool) ($validated['is_virtual'] ?? false),
            'status' => $validated['status'],
        ]);

        return redirect()->route('church-admin.events')->with('success', 'Church event created successfully.');
    }

    public function updateEvent(Request $request, Event $event)
    {
        $validated = $request->validate($this->eventValidationRules());

        $event->update([
            ...$validated,
            'is_virtual' => (bool) ($validated['is_virtual'] ?? false),
        ]);

        return redirect()->route('church-admin.events')->with('success', 'Church event updated successfully.');
    }

    private function eventValidationRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'event_type' => ['required', 'in:workshop,conference,competition,bootcamp,hackathon'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'location' => ['nullable', 'string', 'max:255'],
            'is_virtual' => ['nullable', 'boolean'],
            'max_participants' => ['nullable', 'integer', 'min:1'],
            'registration_deadline' => ['required', 'date', 'before_or_equal:start_date'],
            'status' => ['required', 'in:upcoming,registration_open,ongoing,cancelled'],
        ];
    }

    public function storeMedia(Request $request)
    {
        $validated = $request->validate([
            'content_type' => ['required', 'in:interview,sermon,testimony,highlight,music'],
            'title' => ['required', 'string', 'max:255'],
            'speaker_name' => ['nullable', 'string', 'max:255'],
            'published_at' => ['required', 'date'],
            'video_url' => ['nullable', 'url', 'max:255'],
            'summary' => ['nullable', 'string'],
            'scripture_reference' => ['nullable', 'string', 'max:255'],
            'featured' => ['nullable', 'boolean'],
            'status' => ['required', 'in:draft,published,archived'],
        ]);

        ChurchMediaContent::create([
            'content_type' => $validated['content_type'],
            'title' => $validated['title'],
            'speaker_name' => $validated['speaker_name'] ?? null,
            'published_at' => $validated['published_at'],
            'video_url' => $validated['video_url'] ?? null,
            'summary' => $validated['summary'] ?? null,
            'scripture_reference' => $validated['scripture_reference'] ?? null,
            'featured' => (bool) ($validated['featured'] ?? false),
            'status' => $validated['status'],
        ]);

        return redirect()->route('church-admin.media')->with('success', 'Media content saved successfully.');
    }
}
