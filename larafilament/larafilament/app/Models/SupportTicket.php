<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    protected $fillable = [
        'title',
        'content',
        'priority',
        'status',
        'department_id',
        'user_id',
        'assigned_to',
        'file_path',
        'support_ticket_id',
        'created_at',
        'updated_at',
    ];

    public function replies()
    {
        return $this->hasMany(SupportTicket::class, 'support_ticket_id');
    }

    public function parent()
    {
        return $this->belongsTo(SupportTicket::class, 'support_ticket_id');
    }

    public function files()
    {
        return $this->hasMany(SupportTicketFile::class);
    }
}
