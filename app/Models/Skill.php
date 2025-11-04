<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['id', 'name', 'status', 'mechanic_type_id'];

    public function user()
    {
        return $this->belongsToMany(User::class, 'mechanic_skills', 'skill_id', 'mechanic_id')->withTimestamps();
    }
}
