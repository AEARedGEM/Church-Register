<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\NapsRespondent
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 * @method static \Illuminate\Database\Eloquent\Builder query()
 * @method static int count($columns = '*')
 * @method static \Illuminate\Database\Eloquent\Builder whereNotNull($columns, $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder whereJsonContains($column, $value, $boolean = 'and', $not = false)
 */

class NapsRespondent extends Model
{
    use HasFactory;

    public static function query(): Builder
    {
        return parent::query();
    }

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
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get respondent responses
     */
    public function responses(): HasMany
    {
        return $this->hasMany(NapsSurveyResponse::class, 'respondent_id');
    }

    /**
     * Scope to get completed surveys
     */
    public function scopeCompleted(Builder $query)
    {
        return $query->whereNotNull('survey_completed_at');
    }

    /**
     * Scope to filter by state
     */
    public function scopeByState(Builder $query, string $state)
    {
        return $query->where('state', $state);
    }

    /**
     * Scope to filter by employment status
     */
    public function scopeByEmploymentStatus(Builder $query, string $status)
    {
        return $query->where('employment_status', $status);
    }
}
