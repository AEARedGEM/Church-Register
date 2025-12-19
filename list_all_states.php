<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\State;

$seededStates = State::orderBy('name')->pluck('name')->toArray();

echo "✅ Total States: " . count($seededStates) . "\n";
echo "✅ FCT Present: " . (in_array('Fct', $seededStates) ? 'YES' : 'NO') . "\n\n";

echo "All 36 States + FCT:\n";
foreach ($seededStates as $state) {
    echo "  ✓ $state\n";
}
