<?php

namespace Tests\Feature;

use App\Models\SmallGroup;
use App\Models\SmallGroupMembership;
use App\Models\SmallGroupMeeting;
use App\Models\SmallGroupMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SmallGroupsFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_small_groups_page_lists_active_groups_in_name_order(): void
    {
        SmallGroup::create([
            'name' => 'Young Adults Fellowship',
            'description' => 'A weekly space for prayer and honest conversation.',
            'meeting_day' => 'Thursday',
            'meeting_time' => '6:30 PM',
            'location' => 'Fellowship Hall',
            'leader_name' => 'Grace Adebayo',
            'contact_email' => 'young-adults@example.com',
            'is_active' => true,
        ]);
        SmallGroup::create([
            'name' => 'Family Life Group',
            'is_active' => true,
        ]);
        SmallGroup::create([
            'name' => 'Archived Group',
            'is_active' => false,
        ]);

        $this->get('/small-groups')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('groups', 2)
                ->where('groups.0.name', 'Family Life Group')
                ->where('groups.1.name', 'Young Adults Fellowship')
                ->where('groups.1.meeting_day', 'Thursday')
            );
    }

    public function test_public_small_groups_page_supports_empty_state(): void
    {
        $this->get('/small-groups')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('groups', 0));
    }

    public function test_authenticated_member_can_join_an_active_group_once(): void
    {
        /** @var User $member */
        $member = User::factory()->create();
        $group = SmallGroup::create(['name' => 'Prayer Circle', 'is_active' => true]);

        $this->actingAs($member)
            ->post('/small-groups/' . $group->id . '/join')
            ->assertRedirect('/small-groups');

        $this->actingAs($member)
            ->post('/small-groups/' . $group->id . '/join')
            ->assertRedirect('/small-groups');

        $this->assertDatabaseCount('small_group_memberships', 1);
        $this->assertDatabaseHas('small_group_memberships', [
            'small_group_id' => $group->id,
            'user_id' => $member->id,
            'status' => 'active',
        ]);
    }

    public function test_member_cannot_join_an_inactive_group(): void
    {
        /** @var User $member */
        $member = User::factory()->create();
        $group = SmallGroup::create(['name' => 'Closed Group', 'is_active' => false]);

        $this->actingAs($member)
            ->post('/small-groups/' . $group->id . '/join')
            ->assertStatus(422);

        $this->assertDatabaseCount('small_group_memberships', 0);
    }

    public function test_public_groups_show_only_upcoming_scheduled_meetings(): void
    {
        $group = SmallGroup::create(['name' => 'Prayer Circle', 'is_active' => true]);
        SmallGroupMeeting::create([
            'small_group_id' => $group->id,
            'title' => 'Next Prayer Circle',
            'starts_at' => now()->addDay(),
            'status' => 'scheduled',
        ]);
        SmallGroupMeeting::create([
            'small_group_id' => $group->id,
            'title' => 'Completed Prayer Circle',
            'starts_at' => now()->subDay(),
            'status' => 'completed',
        ]);
        SmallGroupMeeting::create([
            'small_group_id' => $group->id,
            'title' => 'Cancelled Prayer Circle',
            'starts_at' => now()->addDays(2),
            'status' => 'cancelled',
        ]);

        $this->get('/small-groups')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('groups.0.meetings', 1)
                ->where('groups.0.meetings.0.title', 'Next Prayer Circle')
            );
    }

    public function test_active_group_member_can_view_and_post_private_messages(): void
    {
        /** @var User $member */
        $member = User::factory()->create(['name' => 'Grace Member']);
        $group = SmallGroup::create(['name' => 'Prayer Circle', 'is_active' => true]);
        SmallGroupMembership::create(['small_group_id' => $group->id, 'user_id' => $member->id, 'status' => 'active']);
        SmallGroupMessage::create(['small_group_id' => $group->id, 'user_id' => $member->id, 'body' => 'Looking forward to our next prayer meeting.']);

        $this->actingAs($member)
            ->get('/small-groups/' . $group->id . '/messages')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('group.name', 'Prayer Circle')
                ->where('messages.0.body', 'Looking forward to our next prayer meeting.')
                ->where('messages.0.user.name', 'Grace Member')
            );

        $this->actingAs($member)
            ->post('/small-groups/' . $group->id . '/messages', ['body' => 'I can bring the study notes.'])
            ->assertRedirect('/small-groups/' . $group->id . '/messages');

        $this->assertDatabaseHas('small_group_messages', ['small_group_id' => $group->id, 'user_id' => $member->id, 'body' => 'I can bring the study notes.']);
    }

    public function test_non_member_cannot_view_or_post_group_messages(): void
    {
        /** @var User $member */
        $member = User::factory()->create();
        $group = SmallGroup::create(['name' => 'Private Group', 'is_active' => true]);

        $this->actingAs($member)->get('/small-groups/' . $group->id . '/messages')->assertForbidden();
        $this->actingAs($member)->post('/small-groups/' . $group->id . '/messages', ['body' => 'I should not see this.'])->assertForbidden();

        $this->assertDatabaseCount('small_group_messages', 0);
    }
}
