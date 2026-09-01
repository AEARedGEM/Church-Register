<?php

namespace Tests\Feature;

use App\Models\AttendanceRecord;
use App\Models\ChurchMediaContent;
use App\Models\ChurchMinistry;
use App\Models\ChurchPrayerRequest;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchPublicEngagementFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_media_detail_page_reads_church_media_content(): void
    {
        $media = ChurchMediaContent::create([
            'content_type' => 'sermon',
            'title' => 'The Power of Persistent Prayer',
            'speaker_name' => 'Pastor Grace',
            'published_at' => '2026-09-01',
            'video_url' => 'https://example.com/sermon',
            'summary' => 'A powerful sermon on prayer and faith.',
            'featured' => true,
            'status' => 'published',
        ]);

        $response = $this->get('/media/' . $media->id);

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('media.title', 'The Power of Persistent Prayer')
            ->where('media.speaker_name', 'Pastor Grace')
        );
    }

    public function test_public_homepage_uses_live_church_summary_data(): void
    {
        $user = User::factory()->create();

        AttendanceRecord::create([
            'user_id' => $user->id,
            'member_profile_id' => null,
            'service_type' => 'main_service',
            'service_date' => '2026-09-01',
            'status' => 'present',
            'first_timer' => false,
            'recorded_by' => $user->id,
            'notes' => 'Sunday service attendance',
        ]);

        ChurchPrayerRequest::create([
            'user_id' => $user->id,
            'full_name' => 'Joy Adebayo',
            'email' => 'joy@example.com',
            'request_type' => 'healing',
            'message' => 'Please pray for strength and wisdom in my family.',
            'is_public' => false,
            'status' => 'pending',
        ]);

        ChurchMinistry::create([
            'name' => 'Youth Ministry',
            'description' => 'Youth discipleship and outreach.',
            'leader_name' => 'Pastor Joy',
            'is_active' => true,
        ]);

        Event::create([
            'title' => 'Community Prayer Night',
            'description' => 'A prayer and worship gathering.',
            'event_type' => 'workshop',
            'start_date' => now()->addDays(4),
            'end_date' => now()->addDays(4)->addHours(3),
            'location' => 'Main Hall',
            'is_virtual' => false,
            'registration_deadline' => now()->addDays(2),
            'status' => 'registration_open',
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('churchSummary.attendance_total', 1)
            ->where('churchSummary.prayer_requests', 1)
            ->where('churchSummary.active_ministries', 1)
            ->where('churchSummary.upcoming_events', 1)
        );
    }

    public function test_public_prayer_request_form_can_be_submitted(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/media')
            ->post('/prayer-requests', [
                'full_name' => 'Joy Adebayo',
                'email' => 'joy@example.com',
                'request_type' => 'healing',
                'message' => 'Please pray for strength and wisdom in my family.',
                'is_public' => false,
            ]);

        $response->assertRedirect('/media');
        $this->assertDatabaseHas('church_prayer_requests', [
            'full_name' => 'Joy Adebayo',
            'request_type' => 'healing',
        ]);
    }

    public function test_public_events_page_lists_upcoming_church_events(): void
    {
        Event::create([
            'title' => 'Youth Revival Night',
            'description' => 'An evening of worship and spiritual renewal.',
            'event_type' => 'workshop',
            'start_date' => now()->addDays(4),
            'end_date' => now()->addDays(4)->addHours(3),
            'status' => 'upcoming',
            'max_participants' => 200,
            'registration_deadline' => now()->addDays(2),
        ]);

        $response = $this->get('/events');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('events.0.title', 'Youth Revival Night')
            ->where('events.0.status', 'upcoming')
        );
    }

    public function test_public_event_detail_page_and_registration_flow_work(): void
    {
        $user = User::factory()->create();
        $event = Event::create([
            'title' => 'Neighborhood Prayer Gathering',
            'description' => 'A citywide prayer and worship gathering.',
            'event_type' => 'conference',
            'start_date' => now()->addDays(8),
            'end_date' => now()->addDays(8)->addHours(2),
            'location' => 'Faith Centre Hall',
            'max_participants' => 150,
            'registration_deadline' => now()->addDays(6),
            'status' => 'registration_open',
        ]);

        $detailResponse = $this->get('/events/' . $event->id);
        $detailResponse->assertOk();
        $detailResponse->assertInertia(fn ($page) => $page
            ->where('event.title', 'Neighborhood Prayer Gathering')
            ->where('event.location', 'Faith Centre Hall')
        );

        $registerResponse = $this
            ->actingAs($user)
            ->post('/events/' . $event->id . '/register');

        $registerResponse->assertRedirect();
        $this->assertDatabaseHas('event_registrations', [
            'user_id' => $user->id,
            'event_id' => $event->id,
            'status' => 'registered',
        ]);
    }
}
