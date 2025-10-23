<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Redirect;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function index(Request $request)
    {
        return Inertia::render('Admin/Users/Report', [
            'users' => Inertia::defer(fn() => $this->userRepository->users($request)),
        ]);
    }

    public function create()
    {
        $roles = $this->userRepository->roles();
        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $req = $request->validated();

        try {
            DB::beginTransaction();

            $user = User::create([
                'name' => $req['name'],
                'email' => $req['email'],
                'password' => Hash::make($req['password']),
                'phone_no' => $req['phone_no'] ?? null,
            ]);

            if (!empty($req['role'])) {
                $user->assignRole($req['role']);
            }

            DB::commit();

            return Redirect::route('admin.users')
                ->with(['alert' => 'User created successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::route('admin.users')
                ->withErrors(['message', $e->getMessage()]);
        }
    }

    public function edit(User $user)
    {
        $roles = $this->userRepository->roles();

        return Inertia::render('Admin/Users/EditTabs/Basic', [
            'user' => $user->load('roles'),
            'roles' => $roles,
        ]);
    }
}
