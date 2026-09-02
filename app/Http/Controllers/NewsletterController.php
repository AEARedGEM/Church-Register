<?php

namespace App\Http\Controllers;

use App\Models\ChurchNewsletterSubscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);
        $email = strtolower(trim($validated['email']));
        $subscriber = ChurchNewsletterSubscriber::query()->where('email', $email)->first();

        if ($subscriber) {
            $subscriber->update([
                'status' => 'active',
                'subscribed_at' => now(),
                'unsubscribed_at' => null,
            ]);
        } else {
            ChurchNewsletterSubscriber::create([
                'email' => $email,
                'unsubscribe_token' => ChurchNewsletterSubscriber::newUnsubscribeToken(),
                'status' => 'active',
                'subscribed_at' => now(),
            ]);
        }

        return redirect('/')->with('newsletter_success', 'You are subscribed to church updates.');
    }

    public function unsubscribe(string $token)
    {
        $subscriber = ChurchNewsletterSubscriber::query()->where('unsubscribe_token', $token)->firstOrFail();
        $subscriber->update([
            'status' => 'unsubscribed',
            'unsubscribed_at' => now(),
        ]);

        return Inertia::render('Public/Unsubscribe');
    }

    public function subscribers()
    {
        return Inertia::render('Church/NewsletterSubscribersBoard', [
            'subscribers' => ChurchNewsletterSubscriber::query()
                ->latest('subscribed_at')
                ->get(['id', 'email', 'status', 'subscribed_at', 'unsubscribed_at', 'created_at']),
        ]);
    }
}
