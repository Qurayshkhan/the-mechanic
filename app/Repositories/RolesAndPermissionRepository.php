<?php

namespace App\Repositories;

use App\Interface\RolesAndPermissionInterface;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionRepository implements RolesAndPermissionInterface
{
    public $role, $permission;
    public function __construct(Role $role, Permission $permission)
    {
        $this->role = $role;
        $this->permission = $permission;
    }

    public function getRoles($request)
    {
        $query = $this->role->query()->with('permissions');
        if ($request->search) {
            $query->where('name', $request->search);
        }
        return $query->orderByDesc('id')->paginate(10);
    }

    public function permissions()
    {
        return $this->permission->all();
    }

    public function updatePermissions($role, $permissions)
    {
        return $role->syncPermissions($permissions);
    }
}
