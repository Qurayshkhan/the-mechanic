<?php

namespace App\Interface;

interface MechanicServiceInterface
{
    public function getByMechanicId($mechanicId);
    public function create($data);
    public function update($id, $data);
    public function delete($id);
    public function findById($id);
}

