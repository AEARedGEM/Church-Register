<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    protected $fillable = [
        'user_id', 'event_id', 'registered_at', 'status',
        'team_name', 'project_submission'
    ];
}
