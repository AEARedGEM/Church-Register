<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChurchUnit extends Model
{
    use HasFactory;

    protected $table = 'church_units';

    protected $fillable = [
        'slug',
        'name',
        'category',
        'summary',
        'aim',
        'objectives',
        'duties',
        'highlights',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'objectives' => 'array',
            'duties' => 'array',
            'highlights' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function leaders(): HasMany
    {
        return $this->hasMany(ChurchUnitLeader::class, 'church_unit_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(ChurchUnitMember::class, 'church_unit_id');
    }
}
