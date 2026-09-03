<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmallGroupMembership extends Model
{
    protected $fillable = [
        'small_group_id',
        'user_id',
        'status',
        'joined_at',
    ];

    protected function casts(): array
    {
        return [
            'joined_at' => 'datetime',
        ];
    }

    public function group()
    {
        return $this->belongsTo(SmallGroup::class, 'small_group_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendances()
    {
        return $this->hasMany(SmallGroupAttendance::class);
    }
}
