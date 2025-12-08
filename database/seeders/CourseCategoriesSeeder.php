<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CourseCategory;

class CourseCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Soft Skills',
                'slug' => 'soft-skills',
                'description' => 'Essential interpersonal and communication skills for professional success',
                'icon' => 'users',
                'color' => '#3B82F6',
                'sort_order' => 1,
                'metadata' => [
                    'popular' => true,
                    'beginner_friendly' => true
                ]
            ],
            [
                'name' => 'Tech Skills',
                'slug' => 'tech-skills',
                'description' => 'Technical and digital skills for the modern workplace',
                'icon' => 'laptop',
                'color' => '#10B981',
                'sort_order' => 2,
                'metadata' => [
                    'high_demand' => true,
                    'certification_available' => true
                ]
            ],
            [
                'name' => 'Vocational Skills',
                'slug' => 'vocational-skills',
                'description' => 'Practical trade and vocational skills for hands-on careers',
                'icon' => 'wrench',
                'color' => '#F59E0B',
                'sort_order' => 3,
                'metadata' => [
                    'hands_on' => true,
                    'industry_relevant' => true
                ]
            ],
            [
                'name' => 'Business Skills',
                'slug' => 'business-skills',
                'description' => 'Entrepreneurship and business management skills',
                'icon' => 'briefcase',
                'color' => '#8B5CF6',
                'sort_order' => 4,
                'metadata' => [
                    'entrepreneurship' => true,
                    'management_focused' => true
                ]
            ],
            [
                'name' => 'Creative Skills',
                'slug' => 'creative-skills',
                'description' => 'Artistic and creative skills for design and media',
                'icon' => 'palette',
                'color' => '#EC4899',
                'sort_order' => 5,
                'metadata' => [
                    'portfolio_building' => true,
                    'project_based' => true
                ]
            ]
        ];

        foreach ($categories as $category) {
            CourseCategory::create($category);
        }
    }
}
