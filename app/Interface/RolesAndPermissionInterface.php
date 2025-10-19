<?php

namespace App\Interface;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

interface RolesAndPermissionInterface
{
    public function getRoles(Request $request): LengthAwarePaginator;
    public function permissions(): Collection;
    public function updatePermissions($role, $permissions): mixed;
}
