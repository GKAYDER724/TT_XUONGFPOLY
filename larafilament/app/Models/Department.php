<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Department extends Model
{
    protected $fillable = ['name'];

    public function supportTickets()
    {
        return $this->hasMany(SupportTicket::class);
    }


    public function users()
    {
        return $this->hasMany(User::class, 'department_id');
    }
}
