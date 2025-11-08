<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MechanicDocument extends Model
{
    protected $fillable = ["mechanic_id","workshop_photo_1", "workshop_photo_2", "workshop_photo_3", "cnic_front", "cnic_back"];
}
