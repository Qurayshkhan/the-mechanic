<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Services\ModuleService;
use App\Services\PermissionService;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class RoleController extends Controller
{
    use AuthorizesRequests;
    protected $roleService, $permissionService, $moduleService;

    public function __construct(RoleService $roleService, PermissionService $permissionService, ModuleService $moduleService)
    {
        $this->roleService = $roleService;
        $this->permissionService = $permissionService;
        $this->moduleService = $moduleService;
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Role::class);
        return Inertia::render('Admin/Roles/Report', [
            'roles' => Inertia::defer(fn() => $this->roleService->getRoles($request)),
        ]);
    }


    public function create()
    {
        $this->authorize('create', Role::class);
        return Inertia::render('Admin/Roles/Create', [
            'modules' => $this->moduleService->getAllModulesWithPermissions(),
        ]);
    }


    public function store(RoleStoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->roleService->createRole($request->all());
            DB::commit();
            return Redirect::route('admin.roles')
                ->with(['alert' => 'Role created successfully.']);

        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::route('admin.roles')
                ->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function edit(Role $role)
    {
        $this->authorize('edit', $role);
        $role->load('permissions');

        return Inertia::render('Admin/Roles/EditTabs/Basic', [
            'role' => $role,
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            DB::beginTransaction();

            $this->roleService->updateRole($role, $request->validated());
            DB::commit();

            return Redirect::route('admin.roles')
                ->with(['alert' => 'Role updated successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withInput()
                ->withErrors(['message' => 'Failed to update role: ' . $e->getMessage()]);
        }
    }

    public function destroy(Role $role)
    {
        $this->authorize('delete', $role);
        try {
            DB::beginTransaction();
            $this->roleService->deleteRole($role);
            DB::commit();
            return Redirect::route('admin.roles')
                ->with(['alert' => 'Role deleted successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withInput()
                ->withErrors(['message' => 'Failed to delete role: ' . $e->getMessage()]);
        }
    }
}
