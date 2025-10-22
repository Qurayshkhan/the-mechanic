<?php

namespace App\Interface;
use Illuminate\Database\Eloquent\Collection;
interface PermissionInterface
{
    public function permissions(): Collection;

    public function getPermissionsByIds(array $ids): Collection;

    public function updatePermissions($role, $permissions): mixed;
}
