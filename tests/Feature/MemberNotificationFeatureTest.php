<?php

namespace Tests\Feature;

use App\Models\ChurchContactMessage;
use App\Models\User;
use App\Notifications\ContactMessageResolved;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberNotificationFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_sees_only_their_own_notifications(): void
    {
        $member = User::factory()->create();
        $otherMember = User::factory()->create();
        $message = ChurchContactMessage::create([
            'user_id' => $member->id,
            'full_name' => $member->name,
            'email' => $member->email,
            'subject' => 'My question',
            'message' => 'Please help me find a ministry.',
            'status' => 'resolved',
        ]);
        $otherMessage = ChurchContactMessage::create([
            'user_id' => $otherMember->id,
            'full_name' => $otherMember->name,
            'email' => $otherMember->email,
            'subject' => 'Other question',
            'message' => 'This belongs to another member.',
            'status' => 'resolved',
        ]);

        $member->notify(new ContactMessageResolved($message));
        $otherMember->notify(new ContactMessageResolved($otherMessage));

        $this->actingAs($member)
            ->get('/notifications')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('notifications', 1)
                ->where('notifications.0.data.subject', 'My question')
                ->where('notifications.0.read_at', null)
            );
    }

    public function test_member_can_mark_owned_notification_as_read(): void
    {
        $member = User::factory()->create();
        $message = ChurchContactMessage::create([
            'user_id' => $member->id,
            'full_name' => $member->name,
            'email' => $member->email,
            'subject' => 'Resolved question',
            'message' => 'Please confirm the meeting time.',
            'status' => 'resolved',
        ]);
        $member->notify(new ContactMessageResolved($message));
        $notification = $member->notifications()->first();

        $this->actingAs($member)
            ->patch('/notifications/' . $notification->id . '/read')
            ->assertRedirect('/notifications');

        $this->assertNotNull($notification->fresh()->read_at);
    }

    public function test_member_cannot_mark_another_members_notification_as_read(): void
    {
        $member = User::factory()->create();
        $otherMember = User::factory()->create();
        $message = ChurchContactMessage::create([
            'user_id' => $otherMember->id,
            'full_name' => $otherMember->name,
            'email' => $otherMember->email,
            'subject' => 'Private question',
            'message' => 'This belongs to another member.',
            'status' => 'resolved',
        ]);
        $otherMember->notify(new ContactMessageResolved($message));
        $notification = $otherMember->notifications()->first();

        $this->actingAs($member)
            ->patch('/notifications/' . $notification->id . '/read')
            ->assertNotFound();

        $this->assertNull($notification->fresh()->read_at);
    }
}
