<?php

namespace App\Traits;
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

}
