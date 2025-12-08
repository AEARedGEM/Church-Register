<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('slug', 255)->unique();
            $table->text('description');
            $table->text('short_description')->nullable();

            // Foreign key relationships
            $table->foreignId('course_category_id')->constrained('course_categories')->onDelete('cascade');
            $table->foreignId('skill_type_id')->constrained('skill_types')->onDelete('cascade');
            $table->foreignId('instructor_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');

            // Course details
            $table->integer('duration_hours');
            $table->integer('duration_minutes')->default(0); // For more precise duration
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced']);
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('discount_price', 10, 2)->nullable();

            // Course content and structure
            $table->json('prerequisites')->nullable();
            $table->json('learning_objectives');
            $table->json('curriculum')->nullable(); // Course modules/lessons structure
            $table->json('skills_gained')->nullable(); // What skills students will gain
            $table->json('tools_software')->nullable(); // Required tools/software

            // Media and resources
            $table->string('thumbnail')->nullable();
            $table->string('video_preview')->nullable(); // Course preview video
            $table->json('course_materials')->nullable(); // Additional resources, files

            // Certification
            $table->boolean('offers_certificate')->default(true);
            $table->string('certificate_template')->nullable();
            $table->json('certificate_criteria')->nullable(); // Requirements for certificate

            // Course metrics and settings
            $table->integer('max_students')->nullable(); // Enrollment limit
            $table->integer('enrolled_count')->default(0);
            $table->decimal('rating', 3, 2)->default(0.00); // Average rating
            $table->integer('reviews_count')->default(0);
            $table->integer('completion_rate')->default(0); // Percentage

            // Status and visibility
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_premium')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');

            // Scheduling
            $table->timestamp('published_at')->nullable();
            $table->timestamp('enrollment_starts_at')->nullable();
            $table->timestamp('enrollment_ends_at')->nullable();
            $table->timestamp('course_starts_at')->nullable();
            $table->timestamp('course_ends_at')->nullable();

            // SEO and marketing
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable(); // Course tags for search/filtering

            $table->timestamps();

            // Indexes for performance
            $table->index(['course_category_id', 'is_active']);
            $table->index(['skill_type_id', 'is_active']);
            $table->index(['status', 'is_active']);
            $table->index(['is_featured', 'is_active']);
            $table->index(['difficulty_level', 'is_active']);
            $table->index(['instructor_id', 'is_active']);
            $table->index('slug');
            $table->index('published_at');
            $table->index(['price', 'is_active']);
            $table->fullText(['title', 'description']); // For search functionality
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }

};
