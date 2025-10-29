<?php

namespace App\Services;

use App\Repositories\PermissionRepository;

class PermissionService
{

    protected $permissionRepository;


    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function getAllPermissions()
    {
        return $this->permissionRepository->permissions();
    }

    public function getPermissionsByIds($ids)
    {
        return $this->permissionRepository->getPermissionsByIds($ids);
    }

    public function updatePermissions($role, $data)
    {
        $permissions = $data['permissions'] instanceof Collection
            ? $data['permissions']->pluck('id')->toArray()
            : $data['permissions'];

        return $this->permissionRepository->updatePermissions($role, $permissions);
    }

}
