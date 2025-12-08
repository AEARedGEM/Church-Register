<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginHistory extends Model
{
    protected $fillable =[
        'user_id',
        'ip_address',
        'channel',
        'user_agent',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


