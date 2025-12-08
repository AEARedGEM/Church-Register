<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NapsSurveyResponse extends Model
{
    use HasFactory;

    protected $table = 'naps_survey_responses';

    protected $fillable = [
        'respondent_id',
        'question_id',
        'answer',
        'answered_at'
    ];

    protected $casts = [
        'answered_at' => 'datetime',
    ];

    /**
     * Get the respondent for this response
     */
    public function respondent()
    {
        return $this->belongsTo(NapsRespondent::class);
    }

    /**
     * Get the survey question
     */
    public function question()
    {
        return $this->belongsTo(NapsSurveyQuestion::class, 'question_id');
    }
}
