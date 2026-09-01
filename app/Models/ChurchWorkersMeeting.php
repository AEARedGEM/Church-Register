<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchWorkersMeeting extends Model
{
    use HasFactory;

    protected $table = 'church_workers_meetings';

    protected $fillable = [
        'topic',
        'meeting_date',
        'leader_name',
        'summary',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'meeting_date' => 'date',
        ];
    }
}
