<?php

namespace App\Http\Controllers;

use App\Models\AttendanceRecord;
use App\Models\MemberProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChurchAdminController extends Controller
{
    public function index(Request $request)
    {
        $userCount = User::count();
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
            'members' => $members,
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ]);
    }

    public function storeAttendance(Request $request)
    {
        $validated = $request->validate([
            'member_profile_id' => ['required', 'exists:member_profiles,id'],
            'service_type' => ['required', 'string', 'max:50'],
            'service_date' => ['required', 'date', 'date_format:Y-m-d'],
            'status' => ['required', 'in:present,late,absent,excused'],
            'first_timer' => ['nullable', 'boolean'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $memberProfile = MemberProfile::findOrFail($validated['member_profile_id']);

        AttendanceRecord::create([
            'user_id' => $memberProfile->user_id ?? $request->user()->id,
            'member_profile_id' => $memberProfile->id,
            'service_type' => $validated['service_type'],
            'service_date' => $validated['service_date'],
            'status' => $validated['status'],
            'first_timer' => (bool) ($validated['first_timer'] ?? false),
            'recorded_by' => $request->user()->id,
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('church-admin.attendance')->with('success', 'Attendance recorded successfully.');
    }
}
