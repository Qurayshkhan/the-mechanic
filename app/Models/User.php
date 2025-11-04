<?php

namespace App\Models;

use App\Enums\UserType;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Str;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    const ADMIN_ROLE = "Admin";



    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'avatar',
        'name',
        'email',
        'password',
        'phone_no',
        'type',
        'uuid',
        'cnic',
        'date_of_birth',
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

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });

        static::created(function ($model) {
            if ($model->type->value == UserType::MECHANIC->value) {
                $model->mechanicInformation()->create([
                    'mechanic_id' => $model->id,
                ]);
            }
        });

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
            get: fn($value) => $value != "assets/images/avatar/default.png"
            ? asset(ltrim('/storage/' . $value, '/'))
            : asset('assets/images/avatar/default.png')
        );
    }

    public function mechanicInformation()
    {
        return $this->hasOne(MechanicInformation::class, 'mechanic_id', 'id');
    }

    public function isMechanicVerified(): bool
    {
        return $this->mechanicInformation?->is_verified === true;
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'mechanic_skills', 'mechanic_id', 'skill_id')
            ->withTimestamps();
    }


}
