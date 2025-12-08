<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NapsSubSkill extends Model
{
    use SoftDeletes;

    protected $table = 'naps_sub_skills';

    protected $fillable = [
        'naps_skill_group_id',
        'name',
        'description',
        'sort_order'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    /**
     * Get the skill group this sub-skill belongs to
     */
    public function skillGroup(): BelongsTo
    {
        return $this->belongsTo(NapsSkillGroup::class, 'naps_skill_group_id');
    }
}
