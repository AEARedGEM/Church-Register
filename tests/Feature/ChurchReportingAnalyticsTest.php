<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchReportingAnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_church_reports_dashboard_shows_trend_analytics(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/church-admin/reports', [
                'period_type' => 'weekly',
                'title' => 'Week 1 Worship Report',
                'report_date' => '2026-09-01',
                'summary' => 'Strong worship attendance with more youth involvement.',
                'attendance_count' => 120,
                'first_timers_count' => 15,
                'new_members_count' => 5,
                'prayer_requests_count' => 8,
            ]);

        $this->actingAs($user)
            ->post('/church-admin/reports', [
                'period_type' => 'weekly',
                'title' => 'Week 2 Worship Report',
                'report_date' => '2026-09-08',
                'summary' => 'Another strong week with growing attendance and prayer support.',
                'attendance_count' => 160,
                'first_timers_count' => 18,
                'new_members_count' => 7,
                'prayer_requests_count' => 10,
            ]);

        $response = $this->actingAs($user)->get('/church-admin/reports');

        $response->assertOk();
        $response->assertSee('Attendance trend');
        $response->assertSee('Weekly growth');
        $response->assertSee('Strongest period');
    }

    public function test_church_reports_dashboard_can_filter_analytics_by_period_type(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/church-admin/reports', [
            'period_type' => 'weekly',
            'title' => 'Weekly Worship Report',
            'report_date' => '2026-09-08',
            'attendance_count' => 160,
        ]);

        $this->actingAs($user)->post('/church-admin/reports', [
            'period_type' => 'monthly',
            'title' => 'Monthly Worship Report',
            'report_date' => '2026-09-30',
            'attendance_count' => 620,
        ]);

        $response = $this->actingAs($user)->get('/church-admin/reports?period_type=weekly');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->where('periodType', 'weekly')
            ->has('reports', 1)
            ->where('reports.0.title', 'Weekly Worship Report')
        );
    }
}
