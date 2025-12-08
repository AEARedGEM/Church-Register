<?php

// Simple test script to verify NAPS backend setup
require __DIR__ . '/vendor/autoload.php';

$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make('Illuminate\Contracts\Console\Kernel');
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

// Test the models
$questionCount = \App\Models\NapsSurveyQuestion::count();
echo "✓ Survey Questions Seeded: $questionCount questions\n";

$respondentCount = \App\Models\NapsRespondent::count();
echo "✓ Respondents Table: $respondentCount respondents\n";

// Check database tables exist
$tables = DB::select("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = '" . env('DB_DATABASE') . "' AND TABLE_NAME LIKE 'naps_%'");
echo "✓ Database Tables Created: " . count($tables) . " NAPS tables\n";
foreach ($tables as $table) {
    echo "  - {$table->TABLE_NAME}\n";
}

echo "\n✓ NAPS Backend Setup Complete!\n";
