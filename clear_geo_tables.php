<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

DB::statement('SET FOREIGN_KEY_CHECKS=0');
DB::table('wards')->truncate();
DB::table('lgas')->truncate();
DB::table('states')->truncate();
DB::statement('SET FOREIGN_KEY_CHECKS=1');

echo "✓ All tables cleared\n";
