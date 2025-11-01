<?php

namespace App\Services;

use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleService
{
    protected $roleRepository, $permissionRepository;

    public function __construct(RoleRepository $roleRepository, PermissionRepository $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    public function getAllRoles($isAdmin = false)
    {
        return $this->roleRepository->all($isAdmin);
    }

    public function getRoles(Request $request)
    {
        return $this->roleRepository->getRoles($request);
    }

    public function createRole(array $data)
    {
        $role = $this->roleRepository->create($data);
        if (isset($data['permissions'])) {
            $permissions = $this->permissionRepository->getPermissionsByIds($data['permissions']);
            $role->syncPermissions($permissions);
        }

        return $role;
    }

    public function updateRole($role, $data)
    {
        return $this->roleRepository->update($role, $data);
    }

    public function deleteRole(Role $role)
    {
        if ($role->users()->count() > 0) {
            return back()->with('error', 'Cannot delete role. It is assigned to ' . $role->users()->count() . ' user(s).');
        }
        return $role->delete();
    }
}
