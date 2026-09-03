<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('church_newsletter_campaign_recipients')) {
            $indexExists = collect(Schema::getIndexes('church_newsletter_campaign_recipients'))
                ->contains(fn (array $index): bool => $index['name'] === 'newsletter_campaign_recipient_unique');

            if (!$indexExists) {
                Schema::table('church_newsletter_campaign_recipients', function (Blueprint $table) {
                    $table->unique(['campaign_id', 'subscriber_id'], 'newsletter_campaign_recipient_unique');
                });
            }

            return;
        }

        Schema::create('church_newsletter_campaign_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained('church_newsletter_campaigns')->cascadeOnDelete();
            $table->foreignId('subscriber_id')->constrained('church_newsletter_subscribers')->cascadeOnDelete();
            $table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
            $table->dateTime('sent_at')->nullable();
            $table->dateTime('failed_at')->nullable();
            $table->text('error')->nullable();
            $table->timestamps();

            $table->unique(['campaign_id', 'subscriber_id'], 'newsletter_campaign_recipient_unique');
            $table->index(['campaign_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_newsletter_campaign_recipients');
    }
};
