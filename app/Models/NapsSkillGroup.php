<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NapsSkillGroup extends Model
{
    use SoftDeletes;

    protected $table = 'naps_skill_groups';

    protected $fillable = [
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
     * Get the sub-skills for this group
     */
    public function subSkills(): HasMany
    {
        return $this->hasMany(NapsSubSkill::class, 'naps_skill_group_id')->orderBy('sort_order');
    }
}
