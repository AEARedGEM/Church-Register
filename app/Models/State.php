<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\State
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 * @method static \Illuminate\Database\Eloquent\Builder query()
 */

class State extends Model
{
    use SoftDeletes;

    public static function query(): Builder
    {
        return parent::query();
    }

    protected $fillable = [
        'name',
        'abbreviation',
        'sort_order',
    ];

    /**
     * Get the LGAs for this state
     */
    public function lgas(): HasMany
    {
        return $this->hasMany(LGA::class)->orderBy('sort_order');
    }

    /**
     * Get all wards for this state
     */
    public function wards(): HasMany
    {
        return $this->hasMany(Ward::class)->orderBy('sort_order');
    }
}
