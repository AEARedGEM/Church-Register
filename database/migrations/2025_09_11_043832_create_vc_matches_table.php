
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
        Schema::create('vc_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('investor_id')->constrained()->onDelete('cascade');
            $table->enum('funding_stage', ['pre_seed', 'seed', 'series_a', 'series_b', 'series_c']);
            $table->decimal('amount_offered', 15, 2)->nullable();
            $table->integer('match_percentage');
            $table->enum('status', ['matched', 'interested', 'reviewing', 'approved', 'rejected'])->default('matched');
            $table->string('pitch_deck_path')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('matched_at')->useCurrent();
            $table->timestamp('last_interaction_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['investor_id', 'match_percentage']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vc_matches');
    }
};
