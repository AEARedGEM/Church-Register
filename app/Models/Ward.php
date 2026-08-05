<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Ward
 *
 * @mixin \Illuminate\Database\Eloquent\Builder
 * @method static \Illuminate\Database\Eloquent\Builder query()
 */

class Ward extends Model
{
    use SoftDeletes;

    public static function query(): Builder
    {
        return parent::query();
    }

    protected $fillable = [
        'lga_id',
        'state_id',
        'name',
        'sort_order',
    ];

    /**
     * Get the LGA this ward belongs to
     */
    public function lga(): BelongsTo
    {
        return $this->belongsTo(LGA::class);
    }

    /**
     * Get the state this ward belongs to
     */
    public function state(): BelongsTo
    {
        return $this->belongsTo(State::class);
    }
}
