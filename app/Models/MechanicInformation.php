<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MechanicInformation extends Model
{
    protected $fillable = ['mechanic_id', 'mechanic_type_id', 'work_shop_name', 'work_shop_address', 'step_position', 'is_verified', 'step_position', 'years_of_experience', 'certificate', 'license_number'];
}
