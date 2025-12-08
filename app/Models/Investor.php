<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'investment_focus',
        'min_investment',
        'max_investment',
        'preferred_stages',
        'portfolio_companies',
        'contact_email',
        'website',
        'logo_path',
        'geographic_focus',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'investment_focus' => 'array',
            'min_investment' => 'decimal:2',
            'max_investment' => 'decimal:2',
            'preferred_stages' => 'array',
            'geographic_focus' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function vcMatches()
    {
        return $this->hasMany(VcMatch::class);
    }
}
