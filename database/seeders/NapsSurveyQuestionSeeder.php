<?php

namespace Database\Seeders;

use App\Models\NapsSurveyQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NapsSurveyQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            // Basic Information Section
            [
                'question' => 'What is your employment status?',
                'question_type' => 'select',
                'options' => ['Employed', 'Unemployed', 'Self Employed', 'Student', 'Retired'],
                'section' => 'basic',
                'order' => 1,
                'is_required' => true,
            ],
            [
                'question' => 'What is your occupation?',
                'question_type' => 'text',
                'section' => 'basic',
                'order' => 2,
                'is_required' => false,
            ],
            // Skills Section
            [
                'question' => 'What skills do you possess?',
                'question_type' => 'checkbox',
                'options' => ['Web Development', 'Graphic Design', 'Fashion Design', 'Catering', 'Welding', 'Carpentry', 'Farming', 'Tailoring'],
                'section' => 'skills',
                'order' => 1,
                'is_required' => true,
            ],
            [
                'question' => 'What is your skill level?',
                'question_type' => 'select',
                'options' => ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
                'section' => 'skills',
                'order' => 2,
                'is_required' => false,
            ],
            // Products Section
            [
                'question' => 'Which product should your ward focus on producing?',
                'question_type' => 'select',
                'options' => ['Cassava Processing', 'Rice Processing', 'Palm Oil', 'Furniture Making', 'Textile/Adire', 'Shoe Manufacturing', 'Soap Production', 'Software Development', 'Other'],
                'section' => 'products',
                'order' => 1,
                'is_required' => true,
            ],
            // Funding Section
            [
                'question' => 'What type of funding support do you need?',
                'question_type' => 'checkbox',
                'options' => ['Traditional Loan', 'TradeFi Funding', 'Tokenization', 'Equity Funding', 'Grant', 'Mentorship'],
                'section' => 'governance',
                'order' => 1,
                'is_required' => false,
            ],
            [
                'question' => 'How would you rate the governance in your area?',
                'question_type' => 'radio',
                'options' => ['1 - Very Poor', '2 - Poor', '3 - Average', '4 - Good', '5 - Excellent'],
                'section' => 'governance',
                'order' => 2,
                'is_required' => true,
            ],
            [
                'question' => 'What policies would you like to see for youth development?',
                'question_type' => 'textarea',
                'section' => 'governance',
                'order' => 3,
                'is_required' => false,
            ],
        ];

        foreach ($questions as $question) {
            NapsSurveyQuestion::create($question);
        }
    }
}
