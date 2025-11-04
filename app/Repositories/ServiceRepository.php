<?php

namespace App\Repositories;

use App\Interface\ServiceInterface;
use App\Models\Services;

class ServiceRepository implements ServiceInterface
{
    protected $services;
    public function __construct(Services $services)
    {
        $this->services = $services;
    }
    public function getServicesByMechanicTypeId($type)
    {
        return $this->services->where('mechanic_type_id', $type)->get();
    }

    public function create($data)
    {
        return $this->services->create($data);
    }
}
