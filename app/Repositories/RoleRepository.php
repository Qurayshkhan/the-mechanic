<?php

namespace App\Repositories;

use App\Interface\RoleInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleInterface
{
    public $role, $permission;
    public function __construct(Role $role, Permission $permission)
    {
        $this->role = $role;
        $this->permission = $permission;
    }

    public function all(): Collection
    {
        return $this->role->get();
    }
    public function getRoles($request): LengthAwarePaginator
    {
        $query = $this->role->query()->with('permissions');
        if ($request->search) {
            $query->where('name', $request->search);
        }
        return $query->orderByDesc('id')->paginate(10);
    }

    public function create($data): Role
    {
        return $this->role->create($data);
    }

    public function update($role, $data): mixed
    {
        return $role->update($data);
    }

    public function destroy($role): mixed
    {
        return $role->delete();
    }


}
