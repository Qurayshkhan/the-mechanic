<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MechanicInformation extends Model
{
    protected $fillable = [
        'mechanic_id',
        'mechanic_type_id',
        'work_shop_name',
        'work_shop_address',
        'step_position',
        'is_verified',
        'years_of_experience',
        'is_onboarding_form_complete',
        'longitude',
        'latitude',
        'area',
        'city',
        'address',
    ];

    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id', 'id');
    }
}
