<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Repositories\RoleRepository;
use Redirect;

class UserController extends Controller
{
    use PermissionTrait;
    protected $userRepository, $roleRepository;

    public function __construct(UserRepository $userRepository, RoleRepository $roleRepository)
    {
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
    }
    public function index(Request $request)
    {
        $this->isPermissionExists('view_users');
        return Inertia::render('Admin/Users/Report', [
            'users' => Inertia::defer(fn() => $this->userRepository->users($request)),
            'filters' => ['search' => $request->input('search', null)],
        ]);
    }

    public function create()
    {
        $this->isPermissionExists('create_user');
        $roles = $this->roleRepository->roles();
        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();

        try {
            DB::beginTransaction();
            $data['type'] = $data['role'] ? $this->checkRoleType($data['role']) : User::CUSTOMER_USER;
            $data['email_verified_at'] = now();

            $this->userRepository->create($data);

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
        $this->isPermissionExists('edit_user');
        return Inertia::render('Admin/Users/EditTabs/Basic', [
            'user' => $user->load('roles'),
            'roles' => $this->roleRepository->roles(),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $this->userRepository->update($user, $validated);

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
            DB::beginTransaction();
            $this->isPermissionExists('delete_user');
            $this->userRepository->destroy($user);
            DB::commit();
            return Redirect::route('admin.users')->with('alert', 'User deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->withErrors(['message' => $e->getMessage()]);
        }
    }
}
