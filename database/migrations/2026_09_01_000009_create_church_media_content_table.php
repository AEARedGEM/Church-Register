<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_media_content', function (Blueprint $table) {
            $table->id();
            $table->enum('content_type', ['interview', 'sermon', 'testimony', 'highlight', 'music'])->default('interview');
            $table->string('title');
            $table->string('speaker_name')->nullable();
            $table->date('published_at');
            $table->string('video_url')->nullable();
            $table->text('summary')->nullable();
            $table->boolean('featured')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamps();

            $table->index('content_type');
            $table->index('status');
            $table->index('published_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_media_content');
    }
};
