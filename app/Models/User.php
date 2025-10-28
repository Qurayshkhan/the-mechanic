<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    const ADMIN_USER = 1;
    const MECHANIC_USER = 2;
    const CUSTOMER_USER = 3;
    const VENDOR_USER = 3;

    const ADMIN_ROLE = "Admin";

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 2;
    const STATUS_BLOCKED = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_no',
        'type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // protected $appends = ['avatar'];

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

    public function scopeNotAdmin($query)
    {
        return $query->whereHas('roles', function ($q) {
            $q->where('name', '!=', self::ADMIN_ROLE);
        });
    }

    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value
            ? asset(ltrim($value, '/'))
            : asset('assets/images/avatar/default.png')
        );
    }

}
