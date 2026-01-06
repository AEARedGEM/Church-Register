<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class LearningActivityTest extends TestCase
{
    use RefreshDatabase;

    public function test_learning_activity_endpoint_returns_aggregated_hours()
    {
        // Create a user and act as them
        $user = User::factory()->create();
        $this->actingAs($user);

        // Insert lecture_progress rows for the last 3 days
        // Create a course, section and lectures so foreign keys are satisfied
        // Ensure minimal category and skill_type exist for FK constraints
        $categoryId = DB::table('course_categories')->insertGetId([
            'name' => 'Test Category',
            'slug' => 'test-category',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $skillTypeId = DB::table('skill_types')->insertGetId([
            'name' => 'Test Skill',
            'slug' => 'test-skill',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $courseId = DB::table('courses')->insertGetId([
            'title' => 'Test Course',
            'slug' => 'test-course',
            'description' => 'Test',
            'learning_objectives' => json_encode([]),
            'duration_hours' => 1,
            'duration_minutes' => 0,
            'difficulty_level' => 'beginner',
            'price' => 0,
            'created_at' => now(),
            'updated_at' => now(),
            'course_category_id' => $categoryId,
            'skill_type_id' => $skillTypeId,
        ]);

        $sectionId = DB::table('course_sections')->insertGetId([
            'course_id' => $courseId,
            'title' => 'Section 1',
            'order' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $lecture1 = DB::table('course_lectures')->insertGetId([
            'course_section_id' => $sectionId,
            'title' => 'Lec 1',
            'type' => 'video',
            'duration_minutes' => 10,
            'order' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $lecture2 = DB::table('course_lectures')->insertGetId([
            'course_section_id' => $sectionId,
            'title' => 'Lec 2',
            'type' => 'video',
            'duration_minutes' => 8,
            'order' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $lecture3 = DB::table('course_lectures')->insertGetId([
            'course_section_id' => $sectionId,
            'title' => 'Lec 3',
            'type' => 'video',
            'duration_minutes' => 5,
            'order' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $now = now()->startOfDay();
        DB::table('lecture_progress')->insert([
            [
                'user_id' => $user->id,
                'course_lecture_id' => $lecture1,
                'is_completed' => false,
                'progress_percentage' => 50,
                'time_spent_seconds' => 3600,
                'last_position_seconds' => 0,
                'updated_at' => $now->toDateTimeString(),
                'created_at' => $now->toDateTimeString(),
            ],
            [
                'user_id' => $user->id,
                'course_lecture_id' => $lecture2,
                'is_completed' => false,
                'progress_percentage' => 30,
                'time_spent_seconds' => 1800,
                'last_position_seconds' => 0,
                'updated_at' => $now->subDay()->toDateTimeString(),
                'created_at' => $now->subDay()->toDateTimeString(),
            ],
            [
                'user_id' => $user->id,
                'course_lecture_id' => $lecture3,
                'is_completed' => false,
                'progress_percentage' => 10,
                'time_spent_seconds' => 900,
                'last_position_seconds' => 0,
                'updated_at' => $now->subDays(2)->toDateTimeString(),
                'created_at' => $now->subDays(2)->toDateTimeString(),
            ],
        ]);

        $response = $this->getJson('/training/activity?days=7');
        $response->assertStatus(200);
        $json = $response->json('data');

        // Expect 7 days of data
        $this->assertCount(7, $json);

        // Check that at least one day has hours > 0
        $hasNonZero = collect($json)->contains(function ($item) {
            return ($item['hours'] ?? 0) > 0;
        });

        $this->assertTrue($hasNonZero, 'Expected at least one day with >0 hours');
    }
}
