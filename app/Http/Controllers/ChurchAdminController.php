<?php

namespace App\Http\Controllers;

use App\Models\AttendanceRecord;
use App\Models\MemberProfile;
use App\Models\ChurchInvitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChurchAdminController extends Controller
{
    public function index(Request $request)
    {
        $userCount = User::query()->count('*');
        $memberCount = MemberProfile::count();
        $attendanceToday = AttendanceRecord::whereDate('service_date', today())->count();
        $firstTimersToday = AttendanceRecord::whereDate('service_date', today())->where('first_timer', true)->count();

        $upcomingBirthdays = MemberProfile::whereNotNull('date_of_birth')
            ->get()
            ->map(function ($member) {
                $dateOfBirth = $member->date_of_birth;

                if (!$dateOfBirth) {
                    return null;
                }

                $currentYear = now()->year;
                $nextBirthday = $dateOfBirth->copy()->setYear($currentYear);

                if ($nextBirthday->isPast()) {
                    $nextBirthday = $dateOfBirth->copy()->setYear($currentYear + 1);
                }

                return [
                    'id' => $member->id,
                    'name' => trim(($member->first_name ?? '') . ' ' . ($member->last_name ?? '')) ?: 'Unknown member',
                    'date_of_birth' => $dateOfBirth->format('Y-m-d'),
                    'next_birthday' => $nextBirthday->format('Y-m-d'),
                    'department' => $member->department,
                ];
            })
            ->filter()
            ->sortBy('next_birthday')
            ->take(5)
            ->values()
            ->all();

        return Inertia::render('Church/AdminDashboard', [
            'churchData' => [
                'totalMembers' => $memberCount,
                'totalUsers' => $userCount,
                'attendanceToday' => $attendanceToday,
                'firstTimersToday' => $firstTimersToday,
                'serviceName' => 'Sunday Worship Service',
                'upcomingBirthdays' => $upcomingBirthdays,
            ],
            'user' => $request->user(),
        ]);
    }

    public function members(Request $request)
    {
        $query = MemberProfile::with('user')->latest();

        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($memberQuery) use ($search) {
                $memberQuery->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhereRaw("LOWER(CONCAT(first_name, ' ', last_name)) LIKE ?", ['%' . strtolower($search) . '%'])
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('department', 'like', "%{$search}%")
                    ->orWhere('unit', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $status = $request->input('status');

            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        if ($request->filled('department')) {
            $query->where('department', $request->input('department'));
        }

        $members = $query->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'first_name' => $member->first_name,
                'last_name' => $member->last_name,
                'name' => trim(($member->first_name ?? '') . ' ' . ($member->last_name ?? '')) ?: ($member->user?->name ?? 'Unknown'),
                'phone' => $member->phone,
                'membership_status' => $member->membership_status,
                'department' => $member->department,
                'unit' => $member->unit,
                'is_active' => (bool) $member->is_active,
                'email' => $member->user?->email,
                'avatar_url' => $member->avatar_path ? route('member-profile.photo', $member) : null,
            ];
        });

        $departments = MemberProfile::query()
            ->whereNotNull('department')
            ->where('department', '!=', '')
            ->distinct()
            ->orderBy('department')
            ->pluck('department');

        return Inertia::render('Church/MemberDirectory', [
            'members' => $members,
            'filters' => [
                'search' => $request->input('search'),
                'status' => $request->input('status'),
                'department' => $request->input('department'),
            ],
            'departments' => $departments,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeMember(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'gender' => ['nullable', 'string', 'max:20'],
            'membership_status' => ['required', 'string', 'max:50'],
            'department' => ['nullable', 'string', 'max:100'],
            'unit' => ['nullable', 'string', 'max:100'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        MemberProfile::create([
            'user_id' => $request->user()->id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'phone' => $validated['phone'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'membership_status' => $validated['membership_status'],
            'department' => $validated['department'] ?? null,
            'unit' => $validated['unit'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        return redirect()->route('church-admin.members')->with('success', 'Member profile created successfully.');
    }

    public function attendance(Request $request)
    {
        $latestServiceDate = AttendanceRecord::max('service_date');
        $latestServiceDateOnly = $latestServiceDate ? Carbon::parse($latestServiceDate)->format('Y-m-d') : null;
        $attendanceStats = [
            'total' => AttendanceRecord::count(),
            'present_or_late' => AttendanceRecord::whereIn('status', ['present', 'late'])->count(),
            'first_timers' => AttendanceRecord::where('first_timer', true)->whereIn('status', ['present', 'late'])->count(),
            'sunday_school' => AttendanceRecord::where('service_type', 'sunday_school')->whereIn('status', ['present', 'late'])->count(),
            'main_service' => AttendanceRecord::where('service_type', 'main_service')->whereIn('status', ['present', 'late'])->count(),
            'latest_service_date' => $latestServiceDateOnly,
            'latest_service_total' => $latestServiceDateOnly
                ? AttendanceRecord::whereDate('service_date', $latestServiceDateOnly)->whereIn('status', ['present', 'late'])->count()
                : 0,
        ];
        $records = AttendanceRecord::with(['user', 'memberProfile'])
            ->orderByDesc('service_date')
            ->limit(20)
            ->get()
            ->map(function ($record) {
                return [
                    'id' => $record->id,
                    'member' => $record->memberProfile ? trim(($record->memberProfile->first_name ?? '') . ' ' . ($record->memberProfile->last_name ?? '')) : ($record->user?->name ?? 'Unknown'),
                    'service_type' => $record->service_type,
                    'status' => $record->status,
                    'first_timer' => $record->first_timer,
                    'service_date' => $record->service_date->format('Y-m-d'),
                ];
            });

        $members = MemberProfile::query()
            ->select(['id', 'first_name', 'last_name'])
            ->orderBy('first_name')
            ->get()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => trim(($member->first_name ?? '') . ' ' . ($member->last_name ?? '')) ?: 'Unknown member',
            ]);

        return Inertia::render('Church/AttendanceBoard', [
            'attendance' => $records,
            'attendanceStats' => $attendanceStats,
            'members' => $members,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function serviceRegister(Request $request)
    {
        $month = $request->validate([
            'month' => ['nullable', 'date_format:Y-m'],
        ])['month'] ?? now()->format('Y-m');
        $selectedMonth = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
        $sundays = $this->monthSundays($selectedMonth);
        $memberProfiles = MemberProfile::query()
            ->with('user:id,name,referral_code')
            ->where('is_active', true)
            ->orderBy('first_name')
            ->orderBy('last_name')
            ->get();
        $attendance = AttendanceRecord::query()
            ->where('service_type', 'main_service')
            ->whereBetween('service_date', [$selectedMonth->copy()->startOfMonth(), $selectedMonth->copy()->endOfMonth()])
            ->get()
            ->keyBy(fn (AttendanceRecord $record) => $record->member_profile_id . ':' . $record->service_date->format('Y-m-d'));

        $rows = $memberProfiles->map(function (MemberProfile $member) use ($sundays, $attendance) {
            return [
                'id' => $member->id,
                'name' => trim(($member->first_name ?? '') . ' ' . ($member->last_name ?? '')) ?: ($member->user?->name ?? 'Unknown member'),
                'referral_code' => $member->user?->referral_code,
                'weeks' => collect($sundays)->map(function (Carbon $sunday) use ($member, $attendance) {
                    $record = $attendance->get($member->id . ':' . $sunday->format('Y-m-d'));

                    return [
                        'date' => $sunday->format('Y-m-d'),
                        'status' => $record?->status,
                    ];
                })->values()->all(),
            ];
        });

        return Inertia::render('Church/ServiceRegister', [
            'month' => $selectedMonth->format('Y-m'),
            'monthLabel' => $selectedMonth->format('F Y'),
            'sundays' => collect($sundays)->map(fn (Carbon $sunday) => $sunday->format('Y-m-d'))->values(),
            'rows' => $rows,
            'flash' => ['success' => $request->session()->get('success')],
        ]);
    }

    public function storeServiceRegisterAttendance(Request $request)
    {
        $validated = $request->validate([
            'member_profile_id' => ['required', 'exists:member_profiles,id'],
            'month' => ['required', 'date_format:Y-m'],
            'week' => ['required', 'integer', 'between:1,5'],
            'status' => ['nullable', 'in:present,late,absent,excused'],
        ]);

        $selectedMonth = Carbon::createFromFormat('Y-m', $validated['month'])->startOfMonth();
        $sundays = $this->monthSundays($selectedMonth);
        $sunday = $sundays[$validated['week'] - 1] ?? null;
        abort_unless($sunday, 422, 'That week does not contain a Sunday service.');

        $memberProfile = MemberProfile::findOrFail($validated['member_profile_id']);
        $record = AttendanceRecord::query()
            ->where('member_profile_id', $memberProfile->id)
            ->where('service_type', 'main_service')
            ->whereDate('service_date', $sunday->format('Y-m-d'))
            ->first();

        $attributes = [
            'user_id' => $memberProfile->user_id ?? $request->user()->id,
            'status' => $validated['status'] ?? 'present',
            'first_timer' => false,
            'recorded_by' => $request->user()->id,
        ];

        if ($record) {
            $record->update($attributes);
        } else {
            $record = AttendanceRecord::create([
                'member_profile_id' => $memberProfile->id,
                'service_type' => 'main_service',
                'service_date' => $sunday->format('Y-m-d'),
                ...$attributes,
            ]);
        }

        $this->validateInvitationAttendance($record, $memberProfile);

        return redirect()->route('church-admin.service-register', ['month' => $selectedMonth->format('Y-m')])->with('success', 'Service register updated successfully.');
    }

    private function monthSundays(Carbon $month): array
    {
        $sundays = [];
        $cursor = $month->copy()->startOfMonth();

        if ($cursor->dayOfWeek !== Carbon::SUNDAY) {
            $cursor->next(Carbon::SUNDAY);
        }

        while ($cursor->month === $month->month) {
            $sundays[] = $cursor->copy();
            $cursor->addWeek();
        }

        return $sundays;
    }

    public function storeAttendance(Request $request)
    {
        $validated = $request->validate([
            'member_profile_id' => ['required', 'exists:member_profiles,id'],
            'service_type' => ['required', 'in:main_service,sunday_school,workers_meeting,prayer_meeting'],
            'service_date' => ['required', 'date', 'date_format:Y-m-d'],
            'status' => ['required', 'in:present,late,absent,excused'],
            'first_timer' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $memberProfile = MemberProfile::findOrFail($validated['member_profile_id']);

        $attendance = AttendanceRecord::query()
            ->where('member_profile_id', $memberProfile->id)
            ->where('service_type', $validated['service_type'])
            ->whereDate('service_date', $validated['service_date'])
            ->first();
        $attributes = [
            'user_id' => $memberProfile->user_id ?? $request->user()->id,
            'status' => $validated['status'],
            'first_timer' => (bool) ($validated['first_timer'] ?? false),
            'recorded_by' => $request->user()->id,
            'notes' => $validated['notes'] ?? null,
        ];

        if ($attendance) {
            $attendance->update($attributes);
        } else {
            $attendance = AttendanceRecord::create([
                'member_profile_id' => $memberProfile->id,
                'service_type' => $validated['service_type'],
                'service_date' => $validated['service_date'],
                ...$attributes,
            ]);
        }

        $this->validateInvitationAttendance($attendance, $memberProfile);

        return redirect()->route('church-admin.attendance')->with('success', 'Attendance recorded successfully.');
    }

    private function validateInvitationAttendance(AttendanceRecord $attendance, MemberProfile $memberProfile): void
    {
        if ($attendance->service_type === 'main_service'
            && in_array($attendance->status, ['present', 'late'], true)
            && $attendance->service_date->isSunday()) {
            ChurchInvitation::query()
                ->where('invitee_id', $memberProfile->user_id)
                ->whereNull('validated_at')
                ->first()
                ?->update([
                    'validated_at' => now(),
                    'validation_attendance_id' => $attendance->id,
                ]);
        }
    }
}
