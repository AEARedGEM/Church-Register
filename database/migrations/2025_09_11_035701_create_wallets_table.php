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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('currency_type', ['USDI', 'IND', 'NGN']);
            $table->decimal('balance', 20, 8)->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('wallet_address')->nullable(); // For blockchain wallets
            $table->timestamps();

            $table->unique(['user_id', 'currency_type']);
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
