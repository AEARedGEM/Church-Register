<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'member_profile_id',
        'service_type',
        'service_date',
        'status',
        'first_timer',
        'recorded_by',
        'notes',
        'check_in_time',
    ];

    protected function casts(): array
    {
        return [
            'service_date' => 'date',
            'first_timer' => 'boolean',
            'check_in_time' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function memberProfile()
    {
        return $this->belongsTo(MemberProfile::class);
    }
}
