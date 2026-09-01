<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchAdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_church_admin_dashboard_is_accessible_to_authenticated_users(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/church-admin');

        $response->assertOk();
    }

    public function test_church_member_directory_is_accessible_to_authenticated_users(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/church-admin/members');

        $response->assertOk();
    }

    public function test_church_admin_can_record_member_attendance(): void
    {
        $user = User::factory()->create();
        $profile = $user->memberProfile()->create([
            'first_name' => 'Grace',
            'last_name' => 'Member',
            'phone' => '08031234568',
            'gender' => 'female',
            'membership_status' => 'member',
            'is_active' => true,
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/church-admin/attendance')
            ->post('/church-admin/attendance', [
                'member_profile_id' => $profile->id,
                'service_type' => 'main_service',
                'service_date' => '2026-09-01',
                'status' => 'present',
                'first_timer' => false,
                'notes' => 'Joined the morning worship service.',
            ]);

        $response->assertRedirect('/church-admin/attendance');
        $this->assertDatabaseHas('attendance_records', [
            'member_profile_id' => $profile->id,
            'service_type' => 'main_service',
            'status' => 'present',
        ]);
    }

    public function test_church_admin_can_create_a_new_member_profile(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/church-admin/members')
            ->post('/church-admin/members', [
                'first_name' => 'David',
                'last_name' => 'Afolabi',
                'phone' => '08020000001',
                'gender' => 'male',
                'membership_status' => 'member',
                'department' => 'Youth',
                'unit' => 'Media',
                'is_active' => true,
            ]);

        $response->assertRedirect('/church-admin/members');
        $this->assertDatabaseHas('member_profiles', [
            'first_name' => 'David',
            'last_name' => 'Afolabi',
            'phone' => '08020000001',
            'department' => 'Youth',
        ]);
    }

    public function test_church_member_directory_can_filter_and_search_members(): void
    {
        $user = User::factory()->create();

        $user->memberProfile()->create([
            'first_name' => 'Alice',
            'last_name' => 'Adebayo',
            'phone' => '08030000001',
            'gender' => 'female',
            'membership_status' => 'member',
            'department' => 'Choir',
            'unit' => 'Worship',
            'is_active' => true,
        ]);

        $user->memberProfile()->create([
            'first_name' => 'Bola',
            'last_name' => 'Okafor',
            'phone' => '08030000002',
            'gender' => 'female',
            'membership_status' => 'member',
            'department' => 'Ushering',
            'unit' => 'Reception',
            'is_active' => false,
        ]);

        $response = $this
            ->actingAs($user)
            ->get('/church-admin/members?search=alice&status=active');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('members.0.first_name', 'Alice')
            ->where('members.0.department', 'Choir')
            ->where('members.0.is_active', true)
        );
    }

    public function test_public_ministry_pages_are_available_and_data_driven(): void
    {
        $ministry = \App\Models\ChurchMinistry::create([
            'name' => 'Youth Ministry',
            'description' => 'Youth discipleship and outreach.',
            'leader_name' => 'Pastor Joy',
            'is_active' => true,
        ]);

        \App\Models\ChurchLeadershipProfile::create([
            'church_ministry_id' => $ministry->id,
            'name' => 'Pastor Samuel',
            'title' => 'Youth Pastor',
            'bio' => 'Leads the youth discipleship and outreach team.',
            'email' => 'samuel@example.com',
            'phone' => '08031234567',
            'is_active' => true,
        ]);

        $listing = $this->get('/ministries');
        $listing->assertOk();
        $listing->assertInertia(fn ($page) => $page
            ->where('ministries.0.name', 'Youth Ministry')
            ->where('ministries.0.is_active', true)
        );

        $detail = $this->get('/ministries/' . $ministry->id);
        $detail->assertOk();
        $detail->assertInertia(fn ($page) => $page
            ->where('ministry.name', 'Youth Ministry')
            ->where('ministry.leader_name', 'Pastor Joy')
            ->where('ministry.leadership_profiles.0.name', 'Pastor Samuel')
        );
    }

    public function test_hardcoded_super_admin_email_has_admin_access(): void
    {
        $user = User::factory()->create([
            'email' => 'crownpaysme19@gmail.com',
            'name' => 'Crown Admin',
        ]);

        $this->assertTrue($user->hasRole('super_admin'));

        $response = $this
            ->actingAs($user)
            ->get('/church-admin');

        $response->assertOk();
    }

    public function test_church_admin_dashboard_lists_upcoming_birthdays(): void
    {
        $user = User::factory()->create();

        $user->memberProfile()->create([
            'first_name' => 'Grace',
            'last_name' => 'Member',
            'phone' => '08031234568',
            'gender' => 'female',
            'date_of_birth' => '1990-09-05',
            'membership_status' => 'member',
            'is_active' => true,
        ]);

        $response = $this
            ->actingAs($user)
            ->get('/church-admin');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('churchData.upcomingBirthdays.0.name', 'Grace Member')
            ->where('churchData.upcomingBirthdays.0.date_of_birth', '1990-09-05')
        );
    }

    public function test_church_admin_can_manage_leadership_ministries_and_reports(): void
    {
        $user = User::factory()->create();

        $ministryResponse = $this
            ->actingAs($user)
            ->post('/church-admin/ministries', [
                'name' => 'Youth Ministry',
                'description' => 'Youth outreach and discipleship.',
                'leader_name' => 'Pastor Joy',
                'is_active' => true,
            ]);

        $ministryResponse->assertRedirect('/church-admin/ministries');
        $this->assertDatabaseHas('church_ministries', [
            'name' => 'Youth Ministry',
            'leader_name' => 'Pastor Joy',
        ]);

        $leadershipResponse = $this
            ->actingAs($user)
            ->post('/church-admin/leadership', [
                'name' => 'Pastor Samuel',
                'title' => 'Youth Pastor',
                'ministry_id' => 1,
                'bio' => 'Leads the youth discipleship and outreach team.',
                'email' => 'samuel@example.com',
                'phone' => '08031234567',
                'is_active' => true,
            ]);

        $leadershipResponse->assertRedirect('/church-admin/leadership');
        $this->assertDatabaseHas('church_leadership_profiles', [
            'name' => 'Pastor Samuel',
            'title' => 'Youth Pastor',
        ]);

        $reportResponse = $this
            ->actingAs($user)
            ->post('/church-admin/reports', [
                'period_type' => 'weekly',
                'title' => 'Weekly Worship Report',
                'report_date' => '2026-09-01',
                'summary' => 'The young adults ministry recorded a strong turnout.',
                'attendance_count' => 120,
                'first_timers_count' => 16,
                'new_members_count' => 5,
                'prayer_requests_count' => 8,
            ]);

        $reportResponse->assertRedirect('/church-admin/reports');
        $this->assertDatabaseHas('church_reports', [
            'title' => 'Weekly Worship Report',
            'period_type' => 'weekly',
        ]);
    }
}
