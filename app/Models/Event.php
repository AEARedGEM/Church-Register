<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title', 'description', 'event_type', 'start_date', 'end_date',
        'location', 'is_virtual', 'prize_amount', 'max_participants', 'registration_deadline',
        'requirements', 'agenda', 'status', 'banner_image'
    ];

    const TYPES = ['hackathon', 'bootcamp', 'workshop', 'competition', 'conference'];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'registration_deadline' => 'datetime',
            'is_virtual' => 'boolean',
            'requirements' => 'array',
            'agenda' => 'array',
        ];
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now())
                     ->whereIn('status', ['upcoming', 'registration_open', 'ongoing']);
    }
}
