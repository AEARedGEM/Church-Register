<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mentorship extends Model
{
    protected $fillable = [
        'mentee_id', 'mentor_id', 'specialization', 'status',
        'started_at', 'session_count', 'next_session_at'
    ];

    const STATUSES = ['active', 'completed', 'paused', 'cancelled'];
}
