<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PermissionRepository;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    use PermissionTrait;

    protected $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function editPermission(Role $role)
    {
        $this->isPermissionExists('edit_permissions');
        $role->load('permissions');
        return Inertia::render('Admin/Roles/EditTabs/Permissions', [
            'role' => $role,
            'permissions' => $this->permissionRepository->permissions(),
        ]);
    }

    public function updatePermission(Request $request, Role $role)
    {
        try {
            $permissions = $request->permissions instanceof Collection
                ? $request->permissions->pluck('id')->toArray()
                : $request->permissions;

            $this->permissionRepository->updatePermissions($role, $permissions);
            return Redirect::route('admin.roles')
                ->with(['alert' => "Permissions updated successfully."]);
        } catch (\Exception $e) {
            return Redirect::route('admin.roles')
                ->withErrors(['message', $e->getMessage()]);
        }
    }
}
