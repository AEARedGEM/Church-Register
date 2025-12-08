<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SkillType;

class SkillTypesSeeder extends Seeder
{
    public function run(): void
    {
        $skillTypes = [
            [
                'name' => 'Leadership',
                'slug' => 'leadership',
                'description' => 'Skills for leading teams and managing people effectively',
                'icon' => 'crown',
                'color' => '#DC2626',
                'sort_order' => 1
            ],
            [
                'name' => 'Communication',
                'slug' => 'communication',
                'description' => 'Verbal, written, and interpersonal communication skills',
                'icon' => 'message-circle',
                'color' => '#2563EB',
                'sort_order' => 2
            ],
            [
                'name' => 'Technical',
                'slug' => 'technical',
                'description' => 'Technology-focused and programming skills',
                'icon' => 'code',
                'color' => '#059669',
                'sort_order' => 3
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
                'description' => 'Business strategy, management, and entrepreneurship',
                'icon' => 'trending-up',
                'color' => '#7C3AED',
                'sort_order' => 4
            ],
            [
                'name' => 'Creative',
                'slug' => 'creative',
                'description' => 'Design, artistic, and creative problem-solving skills',
                'icon' => 'paintbrush',
                'color' => '#DB2777',
                'sort_order' => 5
            ],
            [
                'name' => 'Analytical',
                'slug' => 'analytical',
                'description' => 'Data analysis, research, and critical thinking skills',
                'icon' => 'bar-chart',
                'color' => '#0891B2',
                'sort_order' => 6
            ],
            [
                'name' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'Online marketing, social media, and digital advertising',
                'icon' => 'megaphone',
                'color' => '#EA580C',
                'sort_order' => 7
            ],
            [
                'name' => 'Financial',
                'slug' => 'financial',
                'description' => 'Accounting, finance, and economic management skills',
                'icon' => 'dollar-sign',
                'color' => '#16A34A',
                'sort_order' => 8
            ]
        ];

        foreach ($skillTypes as $skillType) {
            SkillType::create($skillType);
        }
    }
}
