<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchScorecardsFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_a_scorecard_entry(): void
    {
        $user = User::factory()->create([
            'email' => 'crownpaysme19@gmail.com',
        ]);

        $this->actingAs($user)
            ->post('/church-admin/scorecards', [
                'period_type' => 'weekly',
                'title' => 'Week 1 Invitation League',
                'report_date' => '2026-09-01',
                'invitation_count' => 36,
                'new_visitors_count' => 12,
                'conversion_count' => 4,
                'score' => 88,
                'notes' => 'Strong visitor follow-up and prayer team coverage.',
            ])
            ->assertRedirect('/church-admin/scorecards');

        $this->assertDatabaseHas('church_scorecards', [
            'title' => 'Week 1 Invitation League',
            'period_type' => 'weekly',
            'score' => 88,
            'new_visitors_count' => 12,
        ]);
    }
}
