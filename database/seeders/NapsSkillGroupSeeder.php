<?php

namespace Database\Seeders;

use App\Models\NapsSkillGroup;
use App\Models\NapsSubSkill;
use Illuminate\Database\Seeder;

class NapsSkillGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define skill groups with their sub-skills
        $skillGroups = [
            [
                'name' => 'Digital & Technology',
                'description' => 'Digital skills, software development, and technology-related expertise',
                'skills' => [
                    'Web Development',
                    'Mobile App Development',
                    'UI/UX Design',
                    'Graphic Design',
                    'Data Analytics',
                    'Cloud Computing',
                    'Cybersecurity',
                    'Blockchain/Web3',
                    'Product Design',
                    'Digital Marketing',
                    'Social Media Management',
                    'Software Engineering',
                    'IT Support',
                    'Animation & Motion Graphics',
                    'Video Editing',
                    'AI & Machine Learning',
                    'Photography',
                ]
            ],
            [
                'name' => 'Vocational & Technical',
                'description' => 'Hands-on technical and vocational skills for manufacturing and services',
                'skills' => [
                    'Fashion Design/Tailoring',
                    'Catering/Baking/Pastry',
                    'Welding & Fabrication',
                    'Carpentry/Woodwork',
                    'Electrical Installation',
                    'Plumbing',
                    'Automobile Repairs/Mechatronics',
                    'Solar Installation/Renewable Energy',
                    'Hairdressing & Barbing',
                    'Make-up & Beauty Artistry',
                    'Interior Decoration',
                    'POP/Tiling/Painting',
                    'Aluminum/Metal Work',
                    'Furniture Making',
                ]
            ],
            [
                'name' => 'Business, Entrepreneurship & Finance',
                'description' => 'Business operations, management, and financial expertise',
                'skills' => [
                    'Business Management',
                    'Sales & Marketing',
                    'Project Management',
                    'Accounting & Bookkeeping',
                    'Customer Service',
                    'E-commerce',
                    'Supply Chain & Logistics',
                    'Real Estate',
                    'Market Research',
                    'Startup Building & Fundraising',
                    'Product Management',
                    'Operations Management',
                ]
            ],
            [
                'name' => 'Leadership, Public Service & Communication',
                'description' => 'Leadership, governance, and communication expertise',
                'skills' => [
                    'Leadership & People Management',
                    'Public Speaking',
                    'Community Organizing',
                    'Policy & Governance',
                    'Conflict Resolution',
                    'Teamwork & Collaboration',
                    'Emotional Intelligence',
                    'Event Planning & Coordination',
                    'Negotiation',
                    'Coaching & Mentoring',
                    'Report Writing & Documentation',
                ]
            ],
            [
                'name' => 'Creative & Media',
                'description' => 'Creative expression, media production, and artistic skills',
                'skills' => [
                    'Creative Writing',
                    'Content Creation',
                    'Music Production',
                    'Acting & Performance',
                    'Cinematography',
                    'Videography',
                    'Storytelling',
                    'Podcasting',
                    'Sound Engineering',
                    'Art & Illustration',
                    'Crafts & Handmade Products',
                ]
            ],
        ];

        // Insert skill groups and their sub-skills
        foreach ($skillGroups as $index => $groupData) {
            $group = NapsSkillGroup::create([
                'name' => $groupData['name'],
                'description' => $groupData['description'],
                'sort_order' => $index + 1,
            ]);

            // Insert sub-skills for this group
            foreach ($groupData['skills'] as $skillIndex => $skillName) {
                NapsSubSkill::create([
                    'naps_skill_group_id' => $group->id,
                    'name' => $skillName,
                    'sort_order' => $skillIndex + 1,
                ]);
            }
        }
    }
}
