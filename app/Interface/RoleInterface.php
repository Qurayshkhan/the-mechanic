<?php

namespace App\Interface;


use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Role;

interface RoleInterface
{
    public function getRoles(Request $request): LengthAwarePaginator;

    public function create(array $data): Role;

    public function update($role, array $data): mixed;

    public function destroy($role): mixed;
}
