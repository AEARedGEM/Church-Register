<?php

namespace App\Mail;

use App\Models\ChurchNewsletterCampaign;
use App\Models\ChurchNewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ChurchNewsletterCampaignMessage extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public ChurchNewsletterCampaign $campaign,
        public ChurchNewsletterSubscriber $subscriber,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: $this->campaign->subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.church-newsletter',
            with: [
                'campaign' => $this->campaign,
                'subscriber' => $this->subscriber,
                'unsubscribeUrl' => route('newsletter.unsubscribe', $this->subscriber->unsubscribe_token),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
