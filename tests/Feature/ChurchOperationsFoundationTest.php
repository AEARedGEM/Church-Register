<?php

namespace Tests\Feature;

use App\Models\AttendanceRecord;
use App\Models\MemberProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchOperationsFoundationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_have_a_member_profile_and_attendance_record(): void
    {
        $user = User::factory()->create([
            'name' => 'Jane Member',
            'email' => 'jane@example.com',
        ]);

        $profile = $user->memberProfile()->create([
            'first_name' => 'Jane',
            'last_name' => 'Member',
            'phone' => '08031234567',
            'gender' => 'female',
            'membership_status' => 'member',
            'is_active' => true,
        ]);

        $attendance = AttendanceRecord::create([
            'user_id' => $user->id,
            'member_profile_id' => $profile->id,
            'service_type' => 'main_service',
            'service_date' => '2026-09-01',
            'status' => 'present',
            'first_timer' => false,
            'recorded_by' => $user->id,
        ]);

        $this->assertDatabaseHas('member_profiles', [
            'user_id' => $user->id,
            'phone' => '08031234567',
            'membership_status' => 'member',
        ]);

        $this->assertDatabaseHas('attendance_records', [
            'id' => $attendance->id,
            'service_type' => 'main_service',
            'status' => 'present',
        ]);

        $this->assertEquals('Jane', $user->memberProfile->first_name);
        $this->assertEquals('main_service', $user->attendanceRecords()->first()->service_type);
    }
}
