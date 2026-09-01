<?php

namespace App\Http\Controllers;

use App\Models\ChurchAbsentee;
use App\Models\ChurchLeadershipProfile;
use App\Models\ChurchMediaContent;
use App\Models\ChurchMinistry;
use App\Models\ChurchReport;
use App\Models\ChurchScorecard;
use App\Models\ChurchWorkersMeeting;
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
            'description' => ['nullable', 'string'],
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
        $reports = ChurchReport::query()
            ->orderByDesc('report_date')
            ->get();

        return Inertia::render('Church/ReportsDashboard', [
            'reports' => $reports,
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

    public function storeMedia(Request $request)
    {
        $validated = $request->validate([
            'content_type' => ['required', 'in:interview,sermon,testimony,highlight,music'],
            'title' => ['required', 'string', 'max:255'],
            'speaker_name' => ['nullable', 'string', 'max:255'],
            'published_at' => ['required', 'date'],
            'video_url' => ['nullable', 'url', 'max:255'],
            'summary' => ['nullable', 'string'],
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
            'featured' => (bool) ($validated['featured'] ?? false),
            'status' => $validated['status'],
        ]);

        return redirect()->route('church-admin.media')->with('success', 'Media content saved successfully.');
    }
}
