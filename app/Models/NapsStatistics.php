<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NapsStatistics extends Model
{
    use HasFactory;

    protected $table = 'naps_statistics';

    protected $fillable = [
        'metric_key',
        'metric_value',
        'category',
        'details',
        'recorded_at'
    ];

    protected $casts = [
        'metric_value' => 'float',
        'details' => 'array',
        'recorded_at' => 'datetime',
    ];
}
