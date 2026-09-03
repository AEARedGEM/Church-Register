<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChurchInvitation extends Model
{
    protected $fillable = [
        'inviter_id',
        'invitee_id',
        'referral_code',
        'registered_at',
        'validated_at',
        'validation_attendance_id',
    ];

    protected function casts(): array
    {
        return [
            'registered_at' => 'datetime',
            'validated_at' => 'datetime',
        ];
    }

    public function inviter()
    {
        return $this->belongsTo(User::class, 'inviter_id');
    }

    public function invitee()
    {
        return $this->belongsTo(User::class, 'invitee_id');
    }

    public function validationAttendance()
    {
        return $this->belongsTo(AttendanceRecord::class, 'validation_attendance_id');
    }
}
