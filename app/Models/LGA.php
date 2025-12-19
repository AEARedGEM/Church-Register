<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LGA extends Model
{
    use SoftDeletes;

    protected $table = 'lgas';

    protected $fillable = [
        'state_id',
        'name',
        'sort_order',
    ];

    /**
     * Get the state this LGA belongs to
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }

    /**
     * Get the wards for this LGA
     */
    public function wards(): HasMany
    {
        return $this->hasMany(Ward::class)->orderBy('sort_order');
    }
}
