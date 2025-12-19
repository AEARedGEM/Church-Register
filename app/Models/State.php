<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class State extends Model
{
    use SoftDeletes;

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
