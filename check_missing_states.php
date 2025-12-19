<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\State;

$allNigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
    'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
    'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'
];

$seededStates = State::pluck('name')->toArray();

echo "Expected: " . count($allNigerianStates) . " states\n";
echo "Seeded: " . count($seededStates) . " states\n\n";

$missing = array_diff($allNigerianStates, $seededStates);
$extra = array_diff($seededStates, $allNigerianStates);

if (!empty($missing)) {
    echo "❌ MISSING STATES:\n";
    foreach ($missing as $state) {
        echo "  - $state\n";
    }
} else {
    echo "✅ All states present\n";
}

if (!empty($extra)) {
    echo "\n⚠️ EXTRA STATES (not in expected list):\n";
    foreach ($extra as $state) {
        echo "  - $state\n";
    }
}

echo "\nSeeded states:\n";
foreach (sort($seededStates) as $state) {
    echo "  - $state\n";
}
