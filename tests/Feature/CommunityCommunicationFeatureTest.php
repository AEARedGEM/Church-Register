<?php

namespace Tests\Feature;

use App\Models\Community;
use App\Models\CommunityMembership;
use App\Models\ForumPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class CommunityCommunicationFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_sees_posts_only_from_active_communities(): void
    {
        $member = User::factory()->create();
        $joinedCommunity = Community::create(['name' => 'Prayer Circle', 'sector' => 'Worship', 'description' => 'Prayer and worship support.', 'created_by' => $member->id, 'is_active' => true, 'is_private' => true]);
        $otherCommunity = Community::create(['name' => 'Youth Fellowship', 'sector' => 'Youth', 'description' => 'Youth discipleship community.', 'created_by' => $member->id, 'is_active' => true, 'is_private' => true]);
        CommunityMembership::create(['user_id' => $member->id, 'community_id' => $joinedCommunity->id, 'role' => 'member', 'is_active' => true, 'joined_at' => now()]);
        ForumPost::create(['user_id' => $member->id, 'community_id' => $joinedCommunity->id, 'title' => 'Prayer request', 'content' => 'Please pray for the upcoming service.', 'status' => 'active']);
        ForumPost::create(['user_id' => $member->id, 'community_id' => $otherCommunity->id, 'title' => 'Private youth post', 'content' => 'This is not for the member.', 'status' => 'active']);

        $this->actingAs($member)
            ->get('/community/feed')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('communities', 1)
                ->has('posts', 1)
                ->where('posts.0.title', 'Prayer request')
            );
    }

    public function test_member_with_forum_permission_can_create_a_community_post(): void
    {
        $member = User::factory()->create();
        $permission = Permission::findOrCreate('post_in_forums', 'web');
        $member->givePermissionTo($permission);
        $community = Community::create(['name' => 'Bible Study', 'sector' => 'Discipleship', 'description' => 'Weekly Bible study group.', 'created_by' => $member->id, 'is_active' => true, 'is_private' => false]);
        CommunityMembership::create(['user_id' => $member->id, 'community_id' => $community->id, 'role' => 'member', 'is_active' => true, 'joined_at' => now()]);

        $this->actingAs($member)
            ->post('/community/posts', ['community_id' => $community->id, 'title' => 'Study this week', 'content' => 'Let us read the assigned passage together.'])
            ->assertRedirect('/community/feed');

        $this->assertDatabaseHas('forum_posts', ['user_id' => $member->id, 'community_id' => $community->id, 'title' => 'Study this week', 'status' => 'active']);
    }

    public function test_non_member_cannot_post_to_a_community(): void
    {
        $member = User::factory()->create();
        $permission = Permission::findOrCreate('post_in_forums', 'web');
        $member->givePermissionTo($permission);
        $community = Community::create(['name' => 'Pastoral Care', 'sector' => 'Care', 'description' => 'Pastoral care community.', 'created_by' => $member->id, 'is_active' => true, 'is_private' => true]);

        $this->actingAs($member)
            ->post('/community/posts', ['community_id' => $community->id, 'content' => 'I should not be able to post here.'])
            ->assertForbidden();

        $this->assertDatabaseMissing('forum_posts', ['user_id' => $member->id, 'community_id' => $community->id]);
    }
}
