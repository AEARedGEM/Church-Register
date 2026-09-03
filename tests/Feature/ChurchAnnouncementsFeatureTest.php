<?php

namespace Tests\Feature;

use App\Models\ChurchAnnouncement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchAnnouncementsFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_announcements_show_published_notices_only(): void
    {
        ChurchAnnouncement::create([
            'title' => 'Sunday Service Update',
            'body' => 'This Sunday service begins at 9:00 AM.',
            'published_at' => '2026-09-01',
            'status' => 'published',
        ]);
        ChurchAnnouncement::create([
            'title' => 'Internal Draft Notice',
            'body' => 'This notice is not ready for the public.',
            'published_at' => '2026-09-01',
            'status' => 'draft',
        ]);

        $response = $this->get('/announcements');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->has('announcements', 1)
            ->where('announcements.0.title', 'Sunday Service Update')
        );
    }

    public function test_authenticated_admin_can_create_an_announcement(): void
    {
        /** @var User $user */
        $user = User::factory()->create(['email' => 'crownpaysme19@gmail.com']);

        $response = $this->actingAs($user)->post('/church-admin/announcements', [
            'title' => 'Workers Meeting Reminder',
            'body' => 'Workers meeting holds after the main service.',
            'published_at' => '2026-09-07',
            'status' => 'published',
        ]);

        $response->assertRedirect('/church-admin/announcements');
        $this->assertDatabaseHas('church_announcements', [
            'title' => 'Workers Meeting Reminder',
            'status' => 'published',
        ]);
    }

    public function test_future_dated_published_announcements_are_not_visible_yet(): void
    {
        ChurchAnnouncement::create([
            'title' => 'Future Notice',
            'body' => 'This notice is scheduled for later.',
            'published_at' => now()->addWeek()->toDateString(),
            'status' => 'published',
        ]);

        $this->get('/announcements')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('announcements', 0));
    }
}
