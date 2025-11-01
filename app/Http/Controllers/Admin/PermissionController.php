<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ModuleService;
use App\Services\PermissionService;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    use PermissionTrait;

    protected $permissionService, $moduleService;

    public function __construct(PermissionService $permissionService, ModuleService $moduleService)
    {
        $this->permissionService = $permissionService;
        $this->moduleService = $moduleService;
    }

    public function editPermission(Role $role)
    {
        $this->isPermissionExists('edit_permissions');
        $role->load('permissions');
        return Inertia::render('Admin/Roles/EditTabs/Permissions', [
            'role' => $role,
            'modules' => $this->moduleService->getAllModulesWithPermissions(),
        ]);
    }

    public function updatePermission(Request $request, Role $role)
    {
        try {
            $this->permissionService->updatePermissions($role, $request->all());
            return Redirect::route('admin.roles')
                ->with(['alert' => "Permissions updated successfully."]);
        } catch (\Exception $e) {
            return Redirect::route('admin.roles')
                ->withErrors(['message', $e->getMessage()]);
        }
    }
}
