<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMessage extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public $user,

    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to  APGA Worldwide',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome',
            with: [
                'userName' => $this->user->name,
                'dashboardUrl' => route('dashboard'),
                'supportEmail' => 'crownpaysme19@gmail.com',
                'companyName' => 'Your Company',
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
