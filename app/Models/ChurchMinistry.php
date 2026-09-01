<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchMinistry extends Model
{
    use HasFactory;

    protected $table = 'church_ministries';

    protected $fillable = [
        'name',
        'description',
        'leader_name',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function leadershipProfiles()
    {
        return $this->hasMany(ChurchLeadershipProfile::class, 'church_ministry_id');
    }
}
