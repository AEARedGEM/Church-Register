<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ChurchNewsletterSubscriber extends Model
{
    use HasFactory;

    protected $table = 'church_newsletter_subscribers';

    protected $fillable = [
        'email',
        'unsubscribe_token',
        'status',
        'subscribed_at',
        'unsubscribed_at',
    ];

    protected function casts(): array
    {
        return [
            'subscribed_at' => 'datetime',
            'unsubscribed_at' => 'datetime',
        ];
    }

    public static function newUnsubscribeToken(): string
    {
        return Str::random(64);
    }
}
