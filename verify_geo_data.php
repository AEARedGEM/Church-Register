<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\State, App\Models\LGA, App\Models\Ward;

$statesCount = State::count();
$lgasCount = LGA::count();
$wardsCount = Ward::count();

echo "✅ SEEDING COMPLETE!\n";
echo "States: $statesCount\n";
echo "LGAs: $lgasCount\n";
echo "Wards: $wardsCount\n";
