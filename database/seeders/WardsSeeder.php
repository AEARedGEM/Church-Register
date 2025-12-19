<?php

namespace Database\Seeders;

use App\Models\State;
use App\Models\LGA;
use App\Models\Ward;
use Illuminate\Database\Seeder;

class WardsSeeder extends Seeder
{
    public function run(): void
    {
        $wards = include database_path('seeders/wards_data_complete.php');

        foreach ($wards as $stateName => $lgas) {
            if (empty($stateName)) continue;

            $state = State::create([
                'name' => $stateName,
                'abbreviation' => substr($stateName, 0, 2),
                'sort_order' => 0
            ]);

            $lgaOrder = 1;
            foreach ($lgas as $lgaName => $wardList) {
                $lga = LGA::create([
                    'state_id' => $state->id,
                    'name' => $lgaName,
                    'sort_order' => $lgaOrder++
                ]);

                $wardOrder = 1;
                foreach ($wardList as $wardName) {
                    Ward::create([
                        'lga_id' => $lga->id,
                        'state_id' => $state->id,
                        'name' => $wardName,
                        'sort_order' => $wardOrder++
                    ]);
                }
            }
        }
    }
}

