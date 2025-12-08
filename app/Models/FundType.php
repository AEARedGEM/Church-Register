<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FundType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'description',
        'min_amount',
        'max_amount',
        'interest_rate',
        'duration_months',
        'requirements',
        'eligibility_criteria',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'min_amount' => 'decimal:2',
            'max_amount' => 'decimal:2',
            'interest_rate' => 'decimal:2',
            'requirements' => 'array',
            'eligibility_criteria' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function applications()
    {
        return $this->hasMany(FundingApplication::class);
    }
}
