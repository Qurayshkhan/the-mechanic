<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RolesAndPermissionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RoleAndPermissionController extends Controller
{

    protected $rolesAndPermissionRepository;

    public function __construct(RolesAndPermissionRepository $rolesAndPermissionRepository)
    {
        $this->rolesAndPermissionRepository = $rolesAndPermissionRepository;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/RoleAndPermissions/Report', [
            'roles' => $this->rolesAndPermissionRepository->getRoles($request),
        ]);
    }


    public function create()
    {
        $permissions = $this->rolesAndPermissionRepository->permissions();
        return Inertia::render('Admin/RoleAndPermissions/Create', [
            'permissions' => $permissions,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'guard_name' => 'required|string|max:255',
            'permissions' => 'array|required',
            'permissions.*' => 'exists:permissions,id',
        ]);

        try {
            DB::beginTransaction();

            $role = Role::create([
                'name' => $request->name,
                'guard_name' => $request->guard_name,
            ]);

            if ($request->has('permissions')) {
                $permissions = Permission::whereIn('id', $request->permissions)->get();
                $role->syncPermissions($permissions);
            }

            DB::commit();
            return Redirect::route('admin.rolesAndPermissions')
                ->with(['alert' => 'Role created successfully.']);

        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::route('admin.rolesAndPermissions')
                ->withErrors(['message', $e->getMessage()]);
        }
    }


    public function show(Role $role)
    {
        $role->load('permissions');
        return Inertia::render('Admin/RoleAndPermissions/Show', [
            'role' => $role,
        ]);
    }

    public function edit(Role $role)
    {
        $role->load('permissions');
        $permissions = Permission::orderBy('name')->get();

        return Inertia::render('Admin/RoleAndPermissions/EditTabs/Basic', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    public function editPermission(Role $role)
    {
        $role->load('permissions');
        return Inertia::render('Admin/RoleAndPermissions/EditTabs/Permissions', [
            'role' => $role,
            'permissions' => $this->rolesAndPermissionRepository->permissions(),
        ]);
    }

    public function updatePermission(Request $request, Role $role)
    {
        try {
            $this->rolesAndPermissionRepository->updatePermissions($role, $request->permissions);
            return Redirect::route('admin.rolesAndPermissions')
                ->with(['alert' => "Permissions updated successfully."]);
        } catch (\Exception $e) {
            return Redirect::route('admin.rolesAndPermissions')
                ->withErrors(['message', $e->getMessage()]);
        }
    }


    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'guard_name' => 'required|string|max:255',
        ]);

        try {
            DB::beginTransaction();

            $role->update([
                'name' => $request->name,
                'guard_name' => $request->guard_name,
            ]);
            DB::commit();

            return Redirect::route('admin.rolesAndPermissions')
                ->with(['alert' => 'Role updated successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withInput()
                ->withErrors(['message' => 'Failed to update role: ' . $e->getMessage()]);
        }
    }

    public function destroy(Role $role)
    {
        try {
            DB::beginTransaction();
            if ($role->users()->count() > 0) {
                return back()->with('error', 'Cannot delete role. It is assigned to ' . $role->users()->count() . ' user(s).');
            }
            $role->delete();
            DB::commit();
            return Redirect::route('admin.rolesAndPermissions')
                ->with(['alert' => 'Role deleted successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withInput()
                ->withErrors(['message' => 'Failed to delete role: ' . $e->getMessage()]);
        }
    }
}
