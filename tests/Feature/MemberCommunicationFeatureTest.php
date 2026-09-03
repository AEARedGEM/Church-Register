<?php

namespace Tests\Feature;

use App\Models\ChurchContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MemberCommunicationFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_can_view_only_their_own_church_messages(): void
    {
        /** @var User $member */
        $member = User::factory()->create();
        /** @var User $otherMember */
        $otherMember = User::factory()->create();

        ChurchContactMessage::create([
            'user_id' => $member->id,
            'full_name' => $member->name,
            'email' => $member->email,
            'subject' => 'My ministry question',
            'message' => 'Please help me find a ministry to join.',
            'status' => 'open',
        ]);
        ChurchContactMessage::create([
            'user_id' => $otherMember->id,
            'full_name' => $otherMember->name,
            'email' => $otherMember->email,
            'subject' => 'Private question',
            'message' => 'This message belongs to another member.',
            'status' => 'open',
        ]);

        $this->actingAs($member)
            ->get('/my-messages')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('messages', 1)
                ->where('messages.0.subject', 'My ministry question')
            );
    }

    public function test_resolving_a_member_message_creates_a_database_notification_once(): void
    {
        /** @var User $admin */
        $admin = User::factory()->create(['email' => 'crownpaysme19@gmail.com']);
        /** @var User $member */
        $member = User::factory()->create();
        $message = ChurchContactMessage::create([
            'user_id' => $member->id,
            'full_name' => $member->name,
            'email' => $member->email,
            'subject' => 'Prayer meeting question',
            'message' => 'What time does the prayer meeting begin?',
            'status' => 'open',
        ]);

        $this->actingAs($admin)->post('/church-admin/messages/' . $message->id . '/status', ['status' => 'resolved'])
            ->assertRedirect('/church-admin/messages');

        $this->assertDatabaseHas('notifications', [
            'notifiable_type' => User::class,
            'notifiable_id' => $member->id,
            'type' => 'App\\Notifications\\ContactMessageResolved',
        ]);

        $this->actingAs($admin)->post('/church-admin/messages/' . $message->id . '/status', ['status' => 'resolved']);

        $this->assertSame(1, $member->notifications()->where('type', 'App\\Notifications\\ContactMessageResolved')->count());
    }
}
