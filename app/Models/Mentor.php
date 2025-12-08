<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    protected $fillable = [
        'user_id', 'title', 'specialization', 'experience_years',
        'bio', 'hourly_rate', 'availability', 'rating', 'is_active'
    ];
}
