<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchReport extends Model
{
    use HasFactory;

    protected $table = 'church_reports';

    protected $fillable = [
        'period_type',
        'title',
        'report_date',
        'summary',
        'attendance_count',
        'first_timers_count',
        'new_members_count',
        'prayer_requests_count',
    ];

    protected function casts(): array
    {
        return [
            'report_date' => 'date',
        ];
    }
}
