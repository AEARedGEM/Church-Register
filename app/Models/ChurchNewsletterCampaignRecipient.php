<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchNewsletterCampaignRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'subscriber_id',
        'status',
        'sent_at',
        'failed_at',
        'error',
    ];

    protected function casts(): array
    {
        return [
            'sent_at' => 'datetime',
            'failed_at' => 'datetime',
        ];
    }

    public function campaign()
    {
        return $this->belongsTo(ChurchNewsletterCampaign::class, 'campaign_id');
    }

    public function subscriber()
    {
        return $this->belongsTo(ChurchNewsletterSubscriber::class, 'subscriber_id');
    }
}
