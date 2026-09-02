<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchContactMessage extends Model
{
    use HasFactory;

    protected $table = 'church_contact_messages';

    protected $fillable = [
        'user_id',
        'full_name',
        'email',
        'subject',
        'message',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
