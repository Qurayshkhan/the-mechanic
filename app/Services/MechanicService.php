<?php

namespace App\Services;

use App\Models\MechanicInformation;
use App\Repositories\MechanicInformationRepository;
use App\Repositories\MechanicTypesRepository;
use App\Repositories\SkillsRepository;
use App\Repositories\UserRepository;

class MechanicService
{
    protected $userRepository, $mechanicInformationRepository, $mechanicTypesRepository, $skillRepository;
    public function __construct(UserRepository $userRepository, MechanicInformationRepository $mechanicInformationRepository, MechanicTypesRepository $mechanicTypesRepository, SkillsRepository $skillRepository)
    {
        $this->userRepository = $userRepository;
        $this->mechanicInformationRepository = $mechanicInformationRepository;
        $this->mechanicTypesRepository = $mechanicTypesRepository;
        $this->skillRepository = $skillRepository;
    }


    public function getSkillsByMechanicType($id = null)
    {
        return $this->skillRepository->getSkillsByMechanicType($id);
    }


    public function getAllMechanicTypes()
    {
        return $this->mechanicTypesRepository->all();
    }

    public function updateMechanicOnBoardingForm($userId, $data)
    {
        if ($data['step_position'] == 1) {
            $data['step_position'] = 2;
            $user = $this->userRepository->findById($userId);
            $user = $this->userRepository->update($user, $data);
            $this->mechanicInformationRepository->update($user->id, ['step_position' => 2]);
        }

    }

}
