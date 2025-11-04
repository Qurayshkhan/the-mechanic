<?php

namespace App\Services;

use App\Models\MechanicInformation;
use App\Repositories\MechanicInformationRepository;
use App\Repositories\MechanicServiceRepository;
use App\Repositories\MechanicTypesRepository;
use App\Repositories\ServiceRepository;
use App\Repositories\SkillsRepository;
use App\Repositories\UserRepository;
use Auth;

class MechanicService
{
    protected $userRepository, $mechanicInformationRepository, $mechanicTypesRepository, $skillRepository, $serviceRepository, $mechanicServiceRepository;
    public function __construct(UserRepository $userRepository, MechanicInformationRepository $mechanicInformationRepository, MechanicTypesRepository $mechanicTypesRepository, SkillsRepository $skillRepository, ServiceRepository $serviceRepository, MechanicServiceRepository $mechanicServiceRepository)
    {
        $this->userRepository = $userRepository;
        $this->mechanicInformationRepository = $mechanicInformationRepository;
        $this->mechanicTypesRepository = $mechanicTypesRepository;
        $this->skillRepository = $skillRepository;
        $this->serviceRepository = $serviceRepository;
        $this->mechanicServiceRepository = $mechanicServiceRepository;
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
        $user = $this->userRepository->findById($userId);
        if ($data['step_position'] == 1) {
            $user = $this->userRepository->update($user, $data);
            $this->mechanicInformationRepository->update($user->id, ['step_position' => 2]);
        }
        if ($data['step_position'] == 2) {
            $this->mechanicInformationRepository->update($user->id, [
                'step_position' => 3,
                'mechanic_type_id' => $data['mechanic_type_id'],
                'years_of_experience' => $data['years_of_experience'],
                'work_shop_name' => $data['work_shop_name'],
                'work_shop_address' => $data['work_shop_address'],
                'city' => $data['city'],
                'area' => $data['area'],
            ]);
            $user->skills()->sync($data['skills']);
        }

        if ($data['step_position'] == 3) {
            $this->mechanicInformationRepository->update($user->id, ['step_position' => 4]);
        }
    }

    public function getAllServicesByMechanicType($typeId = null)
    {
        return $this->serviceRepository->getServicesByMechanicTypeId($typeId);
    }

    public function createMechanicService($data)
    {
        $data['mechanic_type_id'] = Auth::user()?->mechanicInformation?->mechanic_type_id ?? null;
        return $this->serviceRepository->create($data);
    }

    public function getMechanicServices($mechanicId)
    {
        return $this->mechanicServiceRepository->getByMechanicId($mechanicId);
    }

    public function storeMechanicService($data)
    {
        $data['mechanic_id'] = Auth::id();
        if (isset($data['id']) && $data['id']) {
            return $this->mechanicServiceRepository->update($data['id'], $data);
        }
        return $this->mechanicServiceRepository->create($data);
    }

    public function deleteMechanicService($id)
    {
        return $this->mechanicServiceRepository->delete($id);
    }


}
