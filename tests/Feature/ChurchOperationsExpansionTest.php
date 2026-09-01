<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchOperationsExpansionTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_record_absentee_and_workers_meeting(): void
    {
        $user = User::factory()->create([
            'email' => 'crownpaysme19@gmail.com',
        ]);

        $this->actingAs($user)
            ->post('/church-admin/absentees', [
                'member_name' => 'Grace James',
                'reason' => 'Travel',
                'service_type' => 'main_service',
                'service_date' => '2026-09-01',
                'status' => 'absent',
            ])
            ->assertRedirect('/church-admin/absentees');

        $this->assertDatabaseHas('church_absentees', [
            'member_name' => 'Grace James',
            'service_type' => 'main_service',
            'reason' => 'Travel',
        ]);

        $this->actingAs($user)
            ->post('/church-admin/workers-meetings', [
                'topic' => 'Youth volunteer planning',
                'meeting_date' => '2026-09-03',
                'leader_name' => 'Pastor Johnson',
                'summary' => 'Volunteers finalized the prep schedule.',
                'status' => 'scheduled',
            ])
            ->assertRedirect('/church-admin/workers-meetings');

        $this->assertDatabaseHas('church_workers_meetings', [
            'topic' => 'Youth volunteer planning',
            'leader_name' => 'Pastor Johnson',
            'status' => 'scheduled',
        ]);
    }
}
