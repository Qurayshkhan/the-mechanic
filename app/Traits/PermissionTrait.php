<?php

namespace App\Traits;
use App\Models\User;
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
                return User::ADMIN_USER;
            case 'mechanic':
                return User::MECHANIC_USER;
            case 'customer':
                return User::CUSTOMER_USER;
            default:
                return null;
        }
    }

}
