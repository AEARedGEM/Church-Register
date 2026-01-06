<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$users = DB::table('users')->select('id','name','email')->limit(20)->get();
foreach ($users as $u) {
    echo "{$u->id}\t{$u->name}\t{$u->email}\n";
}
