<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$count = DB::table('course_lectures')->count();
echo "course_lectures count: {$count}\n";
$ids = DB::table('course_lectures')->limit(10)->pluck('id');
echo "first ids: " . implode(',', $ids->toArray()) . "\n";
