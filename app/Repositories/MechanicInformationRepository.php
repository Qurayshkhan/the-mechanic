<?php

namespace App\Repositories;

use App\Interface\MechanicInformationInterface;
use App\Models\MechanicInformation;

class MechanicInformationRepository implements MechanicInformationInterface
{
    protected $mechanicInformation;

    public function __construct(MechanicInformation $mechanicInformation)
    {
        $this->mechanicInformation = $mechanicInformation;
    }

    public function getAllMechanicsInformation()
    {
        return $this->mechanicInformation->with('mechanic')->paginate(25);
    }

    public function update($mechanicId, $data)
    {
        return $this->mechanicInformation->where('mechanic_id', $mechanicId)->update($data);
    }
}
