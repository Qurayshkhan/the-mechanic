<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['id', 'name', 'status', 'mechanic_type_id'];
}
