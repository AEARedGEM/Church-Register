<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmallGroupMessage extends Model
{
    protected $fillable = [
        'small_group_id',
        'user_id',
        'body',
    ];

    public function group()
    {
        return $this->belongsTo(SmallGroup::class, 'small_group_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
