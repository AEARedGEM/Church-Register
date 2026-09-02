<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchNewsletterCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'subject',
        'body',
        'status',
        'scheduled_at',
        'sent_at',
        'total_recipients',
        'sent_count',
        'failed_count',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
            'sent_at' => 'datetime',
        ];
    }

    public function recipients()
    {
        return $this->hasMany(ChurchNewsletterCampaignRecipient::class, 'campaign_id');
    }
}
