<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NapsRespondent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'state',
        'lga',
        'ward',
        'employment_status',
        'skills',
        'products_interest',
        'funding_needs',
        'governance_rating',
        'survey_completed_at',
        'ip_address',
        'user_agent'
    ];

    protected $casts = [
        'skills' => 'array',
        'products_interest' => 'array',
        'funding_needs' => 'array',
        'survey_completed_at' => 'datetime',
    ];

    /**
     * Get the user associated with this respondent
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get respondent responses
     */
    public function responses()
    {
        return $this->hasMany(NapsSurveyResponse::class, 'respondent_id');
    }

    /**
     * Scope to get completed surveys
     */
    public function scopeCompleted($query)
    {
        return $query->whereNotNull('survey_completed_at');
    }

    /**
     * Scope to filter by state
     */
    public function scopeByState($query, $state)
    {
        return $query->where('state', $state);
    }

    /**
     * Scope to filter by employment status
     */
    public function scopeByEmploymentStatus($query, $status)
    {
        return $query->where('employment_status', $status);
    }
}
