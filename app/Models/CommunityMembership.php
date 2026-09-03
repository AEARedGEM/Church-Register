<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunityMembership extends Model
{
    protected $fillable = [
        'user_id', 'community_id', 'role', 'joined_at', 'is_active'
    ];

    const ROLES = ['member', 'contributor', 'moderator', 'admin', 'observer'];

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
