<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()
            ->count(100)
            ->create()
            ->each(function ($user) {
                // Create user profile
                UserProfile::factory()->create(['user_id' => $user->id]);

                // Create wallets
                foreach (['USDI', 'IND', 'NGN'] as $currency) {
                    Wallet::create([
                        'user_id' => $user->id,
                        'currency_type' => $currency,
                        'balance' => rand(0, 100000),
                        'is_active' => true
                    ]);
                }
            });
    }
}
