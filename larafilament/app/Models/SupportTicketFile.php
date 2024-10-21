<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupportTicketFile extends Model
{
    protected $fillable = [
        'support_ticket_id',
        'file_name',
        'file_path',
        'file_size',
        'file_type',
    ];

    public function supportTicket()
    {
        return $this->belongsTo(SupportTicket::class);
    }
}