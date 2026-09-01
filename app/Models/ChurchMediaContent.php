<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchMediaContent extends Model
{
    use HasFactory;

    protected $table = 'church_media_content';

    protected $fillable = [
        'content_type',
        'title',
        'speaker_name',
        'published_at',
        'video_url',
        'summary',
        'featured',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'date',
            'featured' => 'boolean',
        ];
    }
}
