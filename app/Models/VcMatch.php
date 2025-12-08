<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VcMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'investor_id',
        'funding_stage',
        'amount_offered',
        'match_percentage',
        'status',
        'pitch_deck_path',
        'notes',
        'matched_at',
        'last_interaction_at',
    ];

    protected function casts(): array
    {
        return [
            'amount_offered' => 'decimal:2',
            'matched_at' => 'datetime',
            'last_interaction_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function investor()
    {
        return $this->belongsTo(Investor::class);
    }
}
