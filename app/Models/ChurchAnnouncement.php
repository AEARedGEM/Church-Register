<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchAnnouncement extends Model
{
    use HasFactory;

    protected $table = 'church_announcements';

    protected $fillable = [
        'title',
        'body',
        'published_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
        ];
    }
}
