<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'middle_name',
        'phone',
        'gender',
        'date_of_birth',
        'address',
        'marital_status',
        'occupation',
        'membership_status',
        'membership_number',
        'department',
        'unit',
        'is_active',
        'avatar_path',
        'bio',
        'emergency_contact_name',
        'emergency_contact_phone',
        'profile_completed_at',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'is_active' => 'boolean',
            'profile_completed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendanceRecords()
    {
        return $this->hasMany(AttendanceRecord::class);
    }
}
