<?php

namespace App\Repositories;

use App\Interface\MechanicServiceInterface;
use App\Models\MechanicService;

class MechanicServiceRepository implements MechanicServiceInterface
{
    protected $mechanicService;

    public function __construct(MechanicService $mechanicService)
    {
        $this->mechanicService = $mechanicService;
    }

    public function getByMechanicId($mechanicId)
    {
        return $this->mechanicService->where('mechanic_id', $mechanicId)->get();
    }

    public function create($data)
    {
        return $this->mechanicService->create($data);
    }

    public function update($id, $data)
    {
        return $this->mechanicService->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return $this->mechanicService->where('id', $id)->delete();
    }

    public function findById($id)
    {
        return $this->mechanicService->find($id);
    }
}

