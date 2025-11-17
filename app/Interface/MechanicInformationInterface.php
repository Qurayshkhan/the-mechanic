<?php

namespace App\Interface;


interface MechanicInformationInterface
{
    public function getAllMechanicsInformation();
    public function update($mechanicId, $data);
}
