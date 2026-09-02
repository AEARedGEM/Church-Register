<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Member/Notifications', [
            'notifications' => $request->user()->notifications()->latest()->get(),
        ]);
    }

    public function markRead(Request $request, string $notification)
    {
        $ownedNotification = $request->user()->notifications()->findOrFail($notification);
        $ownedNotification->markAsRead();

        return redirect()->route('member.notifications');
    }
}
