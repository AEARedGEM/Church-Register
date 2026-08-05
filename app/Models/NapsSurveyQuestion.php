<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\NapsSurveyQuestion
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 * @method static \Illuminate\Database\Eloquent\Builder|static query()
 */

class NapsSurveyQuestion extends Model
{
    use HasFactory;

    protected $table = 'naps_survey_questions';

    protected $fillable = [
        'question',
        'question_type',
        'options',
        'section',
        'order',
        'is_required',
        'is_active'
    ];

    protected $casts = [
        'options' => 'array',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get responses for this question
     */
    public function responses()
    {
        return $this->hasMany(NapsSurveyResponse::class, 'question_id');
    }
}
