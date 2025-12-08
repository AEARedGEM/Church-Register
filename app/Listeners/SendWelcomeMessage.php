<?php

namespace App\Listeners;


use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMessage;
use Illuminate\Auth\Events\Registered;

class SendWelcomeMessage
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }


    public function handle(Registered $event): void
    {
        if (isset($event->user)) {
            Mail::to($event->user->email)->send(new WelcomeMessage($event->user));
        }
    }}

