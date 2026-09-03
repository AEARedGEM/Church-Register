<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmallGroupMeeting extends Model
{
    protected $fillable = [
        'small_group_id',
        'title',
        'starts_at',
        'ends_at',
        'location',
        'notes',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function group()
    {
        return $this->belongsTo(SmallGroup::class, 'small_group_id');
    }

    public function attendances()
    {
        return $this->hasMany(SmallGroupAttendance::class);
    }
}
