<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class FundingApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fund_type_id',
        'title',
        'amount_requested',
        'purpose',
        'business_plan',
        'status',
        'applied_at',
        'reviewed_at',
        'approved_at',
        'disbursed_at',
        'rejection_reason',
        'reviewer_notes',
        'reviewed_by',
        'documents',
    ];

    protected function casts(): array
    {
        return [
            'amount_requested' => 'decimal:2',
            'applied_at' => 'datetime',
            'reviewed_at' => 'datetime',
            'approved_at' => 'datetime',
            'disbursed_at' => 'datetime',
            'documents' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fundType()
    {
        return $this->belongsTo(FundType::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
