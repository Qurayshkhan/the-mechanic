<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MechanicService extends Model
{
    protected $fillable = [
        'mechanic_id',
        'name',
        'description',
        'charges',
        'type',
    ];

    protected $casts = [
        'charges' => 'decimal:2',
    ];

    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }
}
