<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
        'status'
    ];

    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id', 'id');
    }

    public function mechanicType()
    {
        return $this->belongsTo(MechanicType::class, 'mechanic_type_id', 'id');
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            function ($value) {
                switch ($value) {
                    case Status::STATUS_PENDING->value:
                        return "Pending";
                    case Status::STATUS_APPROVED->value:
                        return "Approved";
                    case Status::STATUS_COMPLETE->value:
                        return "Completed";
                    case Status::STATUS_REJECTED->value:
                        return "Rejected";

                    default:
                        return "Invalid status";
                }
            }
        );
    }
}
