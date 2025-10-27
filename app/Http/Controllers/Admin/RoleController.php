<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    use PermissionTrait;
    protected $roleRepository, $permissionRepository;

    public function __construct(RoleRepository $roleRepository, PermissionRepository $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    public function index(Request $request)
    {
        $this->isPermissionExists('view_role_and_permission');
        return Inertia::render('Admin/Roles/Report', [
            'roles' => Inertia::defer(fn() => $this->roleRepository->getRoles($request)),
        ]);
    }


    public function create()
    {
        $this->isPermissionExists('create_role');
        $permissions = $this->permissionRepository->permissions();
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $permissions,
        ]);
    }


    public function store(RoleStoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $role = $this->roleRepository->create($request->only('name', 'guard_name'));
            if ($request->has('permissions')) {
                $permissions = $this->permissionRepository->getPermissionsByIds($request->permissions);
                $role->syncPermissions($permissions);
            }

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
        $this->isPermissionExists('edit_role');
        $role->load('permissions');

        return Inertia::render('Admin/Roles/EditTabs/Basic', [
            'role' => $role,
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            DB::beginTransaction();

            $this->roleRepository->update($role, $request->validated());
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
        $this->isPermissionExists('delete_role');
        try {
            DB::beginTransaction();
            if ($role->users()->count() > 0) {
                return back()->with('error', 'Cannot delete role. It is assigned to ' . $role->users()->count() . ' user(s).');
            }
            $this->roleRepository->destroy($role);
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
