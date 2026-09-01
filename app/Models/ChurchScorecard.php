<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchScorecard extends Model
{
    use HasFactory;

    protected $table = 'church_scorecards';

    protected $fillable = [
        'period_type',
        'title',
        'report_date',
        'invitation_count',
        'new_visitors_count',
        'conversion_count',
        'score',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'report_date' => 'date',
            'invitation_count' => 'integer',
            'new_visitors_count' => 'integer',
            'conversion_count' => 'integer',
            'score' => 'integer',
        ];
    }
}
