<?php

namespace App\Repositories;

use App\Interface\PermissionInterface;
use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;

class PermissionRepository implements PermissionInterface
{
    protected $permission;
    public function __construct(Permission $permission)
    {
        $this->permission = $permission;
    }
    public function permissions(): Collection
    {
        return $this->permission->all();
    }

    public function updatePermissions($role, $permissions): mixed
    {

        return $role->syncPermissions($permissions);
    }

    public function getPermissionsByIds(array $ids): Collection
    {
        return $this->permission->whereIn('id', $ids)->get();
    }
}
