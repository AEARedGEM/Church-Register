<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\CourseLecture;

class CourseSectionSeeder extends Seeder
{
    public function run(): void
    {
        $courses = Course::take(10)->get();

        foreach ($courses as $course) {
            // Create course sections
            $sections = [
                ['title' => 'Introduction', 'order' => 1],
                ['title' => 'Core Concepts', 'order' => 2],
                ['title' => 'Practical Applications', 'order' => 3],
                ['title' => 'Assessment & Wrap-up', 'order' => 4],
            ];

            foreach ($sections as $sectionData) {
                $section = CourseSection::create([
                    'course_id' => $course->id,
                    'title' => $sectionData['title'],
                    'order' => $sectionData['order'],
                ]);

                // Add lectures under each section
                switch ($course->slug) {
                    case 'public-speaking-mastery':
                        $this->createLectures($section, [
                            ['Welcome to the Course', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', 8, true],
                            ['Understanding Stage Fear', 'video', 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', 15],
                            ['Body Language Techniques', 'video', 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', 12],
                            ['Quiz: Overcoming Anxiety', 'quiz', null, 10],
                        ]);
                        break;

                    case 'emotional-intelligence-for-leaders':
                        $this->createLectures($section, [
                            ['Introduction to EQ', 'video', 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', 10, true],
                            ['Understanding Emotions', 'document', null, 6],
                            ['Building Empathy', 'video', 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', 15],
                            ['Case Study: Conflict Management', 'quiz', null, 8],
                        ]);
                        break;

                    case 'full-stack-web-development-bootcamp':
                        $this->createLectures($section, [
                            ['Frontend Basics: HTML & CSS', 'video', 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4', 20, true],
                            ['Intro to JavaScript', 'video', 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4', 25],
                            ['React Components Deep Dive', 'video', 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', 30],
                            ['Quiz: DOM Manipulation', 'quiz', null, 10],
                        ]);
                        break;

                    case 'data-science-with-python':
                        $this->createLectures($section, [
                            ['Data Science Overview', 'video', 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', 12, true],
                            ['Using Pandas and NumPy', 'video', 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4', 18],
                            ['Data Visualization with Seaborn', 'video', 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4', 15],
                            ['Mini Project: Analyzing Datasets', 'document', null, 8],
                        ]);
                        break;

                    case 'agro-processing-value-addition':
                        $this->createLectures($section, [
                            ['Processing Fundamentals', 'video', 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', 10, true],
                            ['Preservation Techniques', 'video', 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', 15],
                            ['Packaging and Branding', 'video', 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4', 18],
                            ['Assignment: Create a Packaging Design', 'document', null, 10],
                        ]);
                        break;

                    case 'digital-marketing-masterclass':
                        $this->createLectures($section, [
                            ['Welcome to Digital Marketing', 'video', 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', 8, true],
                            ['SEO Basics and Keyword Research', 'video', 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', 20],
                            ['Social Media Advertising', 'video', 'https://samplelib.com/lib/preview/mp4/sample-25s.mp4', 25],
                            ['Quiz: Marketing Metrics', 'quiz', null, 10],
                        ]);
                        break;

                    case 'graphic-design-fundamentals':
                        $this->createLectures($section, [
                            ['Design Principles 101', 'video', 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', 15, true],
                            ['Color Theory & Typography', 'video', 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', 18],
                            ['Practical Project: Logo Design', 'video', 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4', 25],
                            ['Assignment: Branding Kit', 'document', null, 12],
                        ]);
                        break;

                    default:
                        // Generic fallback for any extra seeded course
                        $this->createLectures($section, [
                            ['Introduction Lecture', 'video', 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', 10, true],
                            ['Main Concepts Overview', 'video', 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4', 15],
                            ['Case Study Session', 'video', 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', 12],
                            ['Quiz: Review', 'quiz', null, 8],
                        ]);
                        break;
                }
            }
        }
    }

    private function createLectures($section, array $lectures)
    {
        $order = 1;
        foreach ($lectures as $lecture) {
            CourseLecture::create([
                'course_section_id' => $section->id,
                'title' => $lecture[0],
                'type' => $lecture[1],
                'video_url' => $lecture[2],
                'duration_minutes' => $lecture[3],
                'order' => $order++,
                'is_preview' => $lecture[4] ?? false,
            ]);
        }
    }
}
