<?php

namespace App\Traits;
use App\Models\User;
use App\Enums\UserType;
use Illuminate\Auth\Access\AuthorizationException;

trait PermissionTrait
{

    public function isPermissionExists(string|array $permissions)
    {
        $user = auth()->user();

        if (!$user || !$user->can($permissions)) {
            throw new AuthorizationException('You do not have permission to perform this action.');
        }

        return true;
    }

    public function checkRoleType($role)
    {
        switch ($role) {
            case 'admin':
                return UserType::ADMIN;
            case 'mechanic':
                return UserType::MECHANIC;
            case 'customer':
                return UserType::CUSTOMER;
            case 'vendor':
                return UserType::VENDOR;
            default:
                return null;
        }
    }
}
