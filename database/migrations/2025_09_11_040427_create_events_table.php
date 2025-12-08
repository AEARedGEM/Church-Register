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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('event_type', ['hackathon', 'bootcamp', 'workshop', 'competition', 'conference']);
            $table->dateTime('start_date'); // Changed from timestamp to dateTime
            $table->dateTime('end_date');   // Changed from timestamp to dateTime
            $table->string('location')->nullable();
            $table->boolean('is_virtual')->default(false);
            $table->decimal('prize_amount', 15, 2)->nullable();
            $table->string('prize_description')->nullable();
            $table->integer('max_participants')->nullable();
            $table->dateTime('registration_deadline'); // Changed from timestamp to dateTime
            $table->json('requirements')->nullable();
            $table->json('agenda')->nullable();
            $table->enum('status', ['upcoming', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'cancelled'])->default('upcoming');
            $table->string('banner_image')->nullable();
            $table->timestamps();

            $table->index(['event_type', 'status']);
            $table->index('registration_deadline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
