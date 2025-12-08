<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sector',
        'description',
        'member_count',
        'activity_level',
        'cover_image',
        'rules',
        'tags',
        'is_private',
        'is_active',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'rules' => 'array',
            'tags' => 'array',
            'is_private' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function memberships()
    {
        return $this->hasMany(CommunityMembership::class);
    }

    public function posts()
    {
        return $this->hasMany(ForumPost::class);
    }
}
