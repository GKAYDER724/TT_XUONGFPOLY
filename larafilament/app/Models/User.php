<?php

namespace App\Models;

use Spatie\Permission\Traits\HasRoles; // Import HasRoles trait
use Illuminate\Notifications\Notifiable;
use BezhanSalleh\FilamentShield\Traits\HasFilamentShield; //
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use BezhanSalleh\FilamentShield\Traits\HasPanelShield;
use Filament\Models\Contracts\FilamentUser;
use Spatie\Permission\Models\Role;
use App\Notifications\ResetPasswordNotification;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory;
    use Notifiable;
    use HasApiTokens;
    use HasRoles;
    use HasPanelShield;
    use Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['name', 'email', 'password', 'number', 'department_id', 'file_path', 'remember_token', 'is_leader',];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get all of the supportTickets.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function supportTickets()
    {
        return $this->hasMany(SupportTicket::class);
    }

    /**
     * Get the department.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    /**
     * Get all of the posts.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }


    public function isLeader()
    {
        return $this->is_leader == 1;
    }
    // Lấy trưởng phòng ban của một nhân viên
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    // Lấy danh sách nhân viên thuộc trưởng phòng ban
    public function employees()
    {
        return $this->hasMany(User::class, 'manager_id');
    }
    public function supportTicket()
    {
        return $this->hasMany(SupportTicket::class);
    }
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
