<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmallGroup extends Model
{
    protected $fillable = [
        'name',
        'description',
        'meeting_day',
        'meeting_time',
        'location',
        'leader_name',
        'contact_email',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function memberships()
    {
        return $this->hasMany(SmallGroupMembership::class);
    }

    public function activeMemberships()
    {
        return $this->memberships()->where('status', 'active');
    }

    public function meetings()
    {
        return $this->hasMany(SmallGroupMeeting::class);
    }

    public function messages()
    {
        return $this->hasMany(SmallGroupMessage::class);
    }
}
