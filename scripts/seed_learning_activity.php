<?php
// seeds 7 days of demo lecture_progress data for the current user (user_id 1)
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

echo "Seeding demo learning activity...\n";

// allow passing user id as first arg, default to 11 if not provided
$userId = isset($argv[1]) ? (int)$argv[1] : 11;


$lectureIds = DB::table('course_lectures')->limit(7)->pluck('id')->toArray();
if (count($lectureIds) < 1) {
    echo "No course_lectures found. Aborting.\n";
    exit(1);
}

// Desired hours per day (7 values) - totals ~17.5
$hours = [3, 2.5, 2.5, 3, 2, 2, 2.5];

for ($i = 0; $i < 7; $i++) {
    $date = Carbon::now()->startOfDay()->subDays(6 - $i);
    $seconds = (int) round($hours[$i] * 3600);
    $lectureId = $lectureIds[$i % count($lectureIds)];

    try {
        // updateOrInsert will create or update existing row for that user+lecture
        DB::table('lecture_progress')->updateOrInsert(
            ['user_id' => $userId, 'course_lecture_id' => $lectureId],
            [
                'time_spent_seconds' => $seconds,
                'last_position_seconds' => 0,
                'created_at' => $date->toDateTimeString(),
                'updated_at' => $date->toDateTimeString(),
            ]
        );

        echo "Set for {$date->toDateString()} (lecture {$lectureId}): " . ($seconds/3600) . " hrs\n";
    } catch (\Exception $e) {
        echo "Failed setting for {$date->toDateString()}: " . $e->getMessage() . "\n";
    }
}

echo "Done.\n";
