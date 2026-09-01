<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChurchUnitLeader extends Model
{
    use HasFactory;

    protected $table = 'church_unit_leaders';

    protected $fillable = [
        'church_unit_id',
        'name',
        'role',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function unit(): BelongsTo
    {
        return $this->belongsTo(ChurchUnit::class, 'church_unit_id');
    }
}
