<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RoleService;
use App\Services\UserService;
use App\Traits\PermissionTrait;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Redirect;

class UserController extends Controller
{
    use AuthorizesRequests, PermissionTrait;
    protected $roleRepository;
    protected $userService, $roleService;

    public function __construct(UserService $userService, RoleService $roleService)
    {
        $this->userService = $userService;
        $this->roleService = $roleService;
    }
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);
        return Inertia::render('Admin/Users/Report', [
            'users' => Inertia::defer(fn() => $this->userService->getUsers($request)),
            'filters' => ['search' => $request->input('search', null)],
        ]);
    }

    public function create()
    {
        $this->authorize('create', User::class);
        return Inertia::render('Admin/Users/Create', [
            'roles' => $this->roleService->getAllRoles(),
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $this->authorize('store', User::class);
        try {
            DB::beginTransaction();
            $this->userService->createUser($request->validated());
            DB::commit();
            return Redirect::route('admin.users')
                ->with(['alert' => 'User created successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::route('admin.users')
                ->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function edit(User $user)
    {
        $this->authorize('edit', User::class);
        return Inertia::render('Admin/Users/EditTabs/Basic', [
            'user' => $user->load('roles'),
            'roles' => $this->roleService->getAllRoles(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);
        try {
            DB::beginTransaction();
            $this->userService->updateUser($user, $request->validated());
            DB::commit();
            return Redirect::route('admin.users')->with('alert', 'User updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }

    public function delete(User $user)
    {
        try {
            $this->authorize('delete', $user);
            DB::beginTransaction();
            $this->userService->userDelete($user);
            DB::commit();
            return Redirect::route('admin.users')->with('alert', 'User deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }
}
