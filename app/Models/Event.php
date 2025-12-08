<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title', 'description', 'event_type', 'start_date', 'end_date',
        'prize_amount', 'max_participants', 'registration_deadline',
        'requirements', 'status'
    ];

    const TYPES = ['hackathon', 'bootcamp', 'workshop', 'competition'];

    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now())
                     ->whereIn('status', ['upcoming', 'registration_open', 'ongoing']);
    }
}
