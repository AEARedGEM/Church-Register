<?php

namespace Tests\Feature;

use App\Models\SmallGroup;
use App\Models\SmallGroupAttendance;
use App\Models\SmallGroupMembership;
use App\Models\SmallGroupMeeting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchSmallGroupManagementTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['email' => 'crownpaysme19@gmail.com']);
    }

    public function test_admin_can_create_a_small_group(): void
    {
        $this->actingAs($this->admin())
            ->post('/church-admin/small-groups', [
                'name' => 'Young Adults Fellowship',
                'description' => 'Prayer, study, and fellowship for young adults.',
                'meeting_day' => 'Thursday',
                'meeting_time' => '6:30 PM',
                'location' => 'Fellowship Hall',
                'leader_name' => 'Grace Adebayo',
                'contact_email' => 'young-adults@example.com',
                'is_active' => true,
            ])
            ->assertRedirect('/church-admin/small-groups');

        $this->assertDatabaseHas('small_groups', [
            'name' => 'Young Adults Fellowship',
            'meeting_day' => 'Thursday',
            'leader_name' => 'Grace Adebayo',
            'is_active' => true,
        ]);
    }

    public function test_small_group_contact_email_must_be_valid(): void
    {
        $this->actingAs($this->admin())
            ->post('/church-admin/small-groups', [
                'name' => 'Invalid Contact Group',
                'contact_email' => 'not-an-email',
            ])
            ->assertSessionHasErrors('contact_email');

        $this->assertDatabaseMissing('small_groups', ['name' => 'Invalid Contact Group']);
    }

    public function test_regular_member_cannot_manage_small_groups(): void
    {
        /** @var User $member */
        $member = User::factory()->create(['email' => 'member@example.com']);

        $this->actingAs($member)
            ->get('/church-admin/small-groups')
            ->assertForbidden();
    }

    public function test_admin_can_view_active_member_counts(): void
    {
        $admin = $this->admin();
        $member = User::factory()->create();
        $group = SmallGroup::create(['name' => 'Care Group', 'is_active' => true]);
        SmallGroupMembership::create([
            'small_group_id' => $group->id,
            'user_id' => $member->id,
            'status' => 'active',
            'joined_at' => now(),
        ]);

        $this->actingAs($admin)
            ->get('/church-admin/small-groups')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->where('groups.0.active_member_count', 1));
    }

    public function test_admin_can_schedule_a_group_meeting(): void
    {
        $group = SmallGroup::create(['name' => 'Bible Study Group', 'is_active' => true]);

        $this->actingAs($this->admin())
            ->post('/church-admin/small-groups/meetings', [
                'small_group_id' => $group->id,
                'title' => 'Thursday Bible Study',
                'starts_at' => '2026-09-10 18:30:00',
                'ends_at' => '2026-09-10 20:00:00',
                'location' => 'Fellowship Hall',
                'status' => 'scheduled',
            ])
            ->assertRedirect('/church-admin/small-groups');

        $this->assertDatabaseHas('small_group_meetings', [
            'small_group_id' => $group->id,
            'title' => 'Thursday Bible Study',
            'status' => 'scheduled',
        ]);
    }

    public function test_meeting_end_must_be_after_start(): void
    {
        $group = SmallGroup::create(['name' => 'Invalid Meeting Group', 'is_active' => true]);

        $this->actingAs($this->admin())
            ->post('/church-admin/small-groups/meetings', [
                'small_group_id' => $group->id,
                'title' => 'Invalid Meeting',
                'starts_at' => '2026-09-10 20:00:00',
                'ends_at' => '2026-09-10 18:00:00',
                'status' => 'scheduled',
            ])
            ->assertSessionHasErrors('ends_at');

        $this->assertDatabaseMissing('small_group_meetings', ['title' => 'Invalid Meeting']);
    }

    public function test_admin_can_record_and_correct_member_attendance(): void
    {
        $admin = $this->admin();
        $member = User::factory()->create();
        $group = SmallGroup::create(['name' => 'Bible Study Group', 'is_active' => true]);
        $membership = SmallGroupMembership::create([
            'small_group_id' => $group->id,
            'user_id' => $member->id,
            'status' => 'active',
        ]);
        $meeting = SmallGroupMeeting::create([
            'small_group_id' => $group->id,
            'title' => 'Thursday Study',
            'starts_at' => '2026-09-10 18:30:00',
            'status' => 'completed',
        ]);

        foreach (['absent', 'present'] as $status) {
            $this->actingAs($admin)
                ->post('/church-admin/small-groups/attendance', [
                    'small_group_meeting_id' => $meeting->id,
                    'small_group_membership_id' => $membership->id,
                    'status' => $status,
                ])
                ->assertRedirect('/church-admin/small-groups');
        }

        $this->assertDatabaseCount('small_group_attendances', 1);
        $this->assertDatabaseHas('small_group_attendances', [
            'small_group_meeting_id' => $meeting->id,
            'small_group_membership_id' => $membership->id,
            'status' => 'present',
            'recorded_by' => $admin->id,
        ]);
    }

    public function test_attendance_rejects_a_member_from_another_group(): void
    {
        $group = SmallGroup::create(['name' => 'First Group', 'is_active' => true]);
        $otherGroup = SmallGroup::create(['name' => 'Second Group', 'is_active' => true]);
        $membership = SmallGroupMembership::create([
            'small_group_id' => $otherGroup->id,
            'user_id' => User::factory()->create()->id,
            'status' => 'active',
        ]);
        $meeting = SmallGroupMeeting::create([
            'small_group_id' => $group->id,
            'title' => 'First Group Meeting',
            'starts_at' => '2026-09-10 18:30:00',
            'status' => 'completed',
        ]);

        $this->actingAs($this->admin())
            ->post('/church-admin/small-groups/attendance', [
                'small_group_meeting_id' => $meeting->id,
                'small_group_membership_id' => $membership->id,
                'status' => 'present',
            ])
            ->assertStatus(422);

        $this->assertDatabaseCount('small_group_attendances', 0);
    }
}
