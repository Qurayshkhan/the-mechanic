<?php

namespace App\Services;

use App\Enums\UserType;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Traits\PermissionTrait;
use Hash;
use Illuminate\Http\Request;

class UserService
{
    use PermissionTrait;
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUsers(Request $request)
    {
        return $this->userRepository->users($request);
    }

    public function createUser($data): User
    {
        $data['type'] = $data['role'] ? $this->checkRoleType($data['role']) : UserType::CUSTOMER;
        $data['email_verified_at'] = now();
        $data['password'] = Hash::make($data['password']);
        $user = $this->userRepository->create($data);

        if (!empty($data['role'])) {
            $user->assignRole($data['role']);
        }
        return $user;
    }

    public function updateUser(User $user, $data): User
    {
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = $this->userRepository->update($user, $data);

        if (!empty($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    public function userDelete(User $user): bool
    {
        return $this->userRepository->destroy($user);
    }
}
