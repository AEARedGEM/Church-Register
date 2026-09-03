<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmallGroupAttendance extends Model
{
    protected $fillable = [
        'small_group_meeting_id',
        'small_group_membership_id',
        'status',
        'notes',
        'recorded_by',
    ];

    public function meeting()
    {
        return $this->belongsTo(SmallGroupMeeting::class, 'small_group_meeting_id');
    }

    public function membership()
    {
        return $this->belongsTo(SmallGroupMembership::class, 'small_group_membership_id');
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
