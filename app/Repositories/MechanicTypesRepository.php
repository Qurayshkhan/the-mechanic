<?php

namespace App\Repositories;

use App\Interface\MechanicInformationInterface;
use App\Interface\MechanicTypesInterface;
use App\Models\MechanicType;

class MechanicTypesRepository implements MechanicTypesInterface
{

    protected $mechanicTypes;
    public function __construct(MechanicType $mechanicType)
    {
        $this->mechanicTypes = $mechanicType;
    }
    public function all()
    {
        return $this->mechanicTypes->get();
    }
}
