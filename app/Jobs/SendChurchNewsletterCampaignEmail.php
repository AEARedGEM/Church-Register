<?php

namespace App\Jobs;

use App\Mail\ChurchNewsletterCampaignMessage;
use App\Models\ChurchNewsletterCampaignRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendChurchNewsletterCampaignEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $recipientId)
    {
    }

    public function handle(): void
    {
        $recipient = ChurchNewsletterCampaignRecipient::with(['campaign', 'subscriber'])->findOrFail($this->recipientId);

        if ($recipient->status === 'sent' || $recipient->subscriber->status !== 'active') {
            return;
        }

        try {
            Mail::to($recipient->subscriber->email)->send(new ChurchNewsletterCampaignMessage($recipient->campaign, $recipient->subscriber));
            $recipient->update(['status' => 'sent', 'sent_at' => now(), 'error' => null]);
            $recipient->campaign()->increment('sent_count');
        } catch (\Throwable $exception) {
            $recipient->update(['status' => 'failed', 'failed_at' => now(), 'error' => $exception->getMessage()]);
            $recipient->campaign()->increment('failed_count');
            throw $exception;
        }

        $campaign = $recipient->campaign()->withCount([
            'recipients as pending_count' => fn ($query) => $query->where('status', 'pending'),
            'recipients as failed_count_current' => fn ($query) => $query->where('status', 'failed'),
        ])->first();

        if ($campaign && $campaign->pending_count === 0) {
            $campaign->update([
                'status' => $campaign->failed_count_current > 0 ? 'failed' : 'sent',
                'sent_at' => now(),
            ]);
        }
    }
}
