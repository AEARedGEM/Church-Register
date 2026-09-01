<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchPrayerRequest extends Model
{
    use HasFactory;

    protected $table = 'church_prayer_requests';

    protected $fillable = [
        'user_id',
        'full_name',
        'email',
        'request_type',
        'message',
        'is_public',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
