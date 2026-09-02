<?php

namespace App\Notifications;

use App\Models\ChurchContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ContactMessageResolved extends Notification
{
    use Queueable;

    public function __construct(public ChurchContactMessage $message)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'church_contact_message_resolved',
            'message_id' => $this->message->id,
            'subject' => $this->message->subject,
            'message' => 'Your church message has been marked as resolved.',
        ];
    }
}
