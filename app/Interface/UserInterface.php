<?php

namespace App\Interface;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Request;

interface UserInterface
{
    public function users(Request $request): LengthAwarePaginator;

    public function create(array $data): User;
    public function destroy(User $user): bool;

    public function update(User $user, array $data): User;
    public function getUserById(int $id);
}
