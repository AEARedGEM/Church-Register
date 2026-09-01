<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchAbsentee extends Model
{
    use HasFactory;

    protected $table = 'church_absentees';

    protected $fillable = [
        'member_name',
        'reason',
        'service_type',
        'service_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'service_date' => 'date',
        ];
    }
}
