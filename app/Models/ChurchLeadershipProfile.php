<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchLeadershipProfile extends Model
{
    use HasFactory;

    protected $table = 'church_leadership_profiles';

    protected $fillable = [
        'church_ministry_id',
        'name',
        'title',
        'bio',
        'email',
        'phone',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function ministry()
    {
        return $this->belongsTo(ChurchMinistry::class, 'church_ministry_id');
    }
}
