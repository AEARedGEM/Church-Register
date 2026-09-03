<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\ChurchScorecard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchReportingAnalyticsTest extends TestCase
{
    use RefreshDatabase;

    public function test_church_reports_dashboard_shows_trend_analytics(): void
    {
        /** @var User $user */
        $user = User::factory()->create(['email' => 'crownpaysme19@gmail.com']);

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

        ChurchScorecard::create([
            'period_type' => 'weekly',
            'title' => 'Week 1 Outreach Scorecard',
            'report_date' => '2026-09-01',
            'invitation_count' => 20,
            'new_visitors_count' => 10,
            'conversion_count' => 2,
            'score' => 70,
        ]);
        ChurchScorecard::create([
            'period_type' => 'weekly',
            'title' => 'Week 2 Outreach Scorecard',
            'report_date' => '2026-09-08',
            'invitation_count' => 30,
            'new_visitors_count' => 15,
            'conversion_count' => 6,
            'score' => 82,
        ]);

        $response = $this->actingAs($user)->get('/church-admin/reports');

        $response->assertOk();
        $response->assertSee('Attendance trend');
        $response->assertSee('Weekly growth');
        $response->assertSee('Strongest period');
        $response->assertInertia(fn ($page) => $page
            ->where('reports.0.attendance_count', 160)
            ->where('reports.1.attendance_count', 120)
            ->where('analytics.totalAttendance', 280)
            ->where('analytics.attendanceTrend', '+40')
            ->where('analytics.weeklyGrowth', '+33%')
            ->where('analytics.strongestPeriod', 'Weekly (280)')
            ->where('analytics.totalInvitations', 50)
            ->where('analytics.totalVisitors', 25)
            ->where('analytics.totalConversions', 8)
            ->where('analytics.conversionRate', '32%')
            ->where('analytics.scoreTrend', '+12')
            ->where('analytics.attendanceComparison', '+40')
            ->where('analytics.invitationComparison', '+10')
        );
    }

    public function test_church_reports_dashboard_can_filter_analytics_by_period_type(): void
    {
        /** @var User $user */
        $user = User::factory()->create(['email' => 'crownpaysme19@gmail.com']);

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
