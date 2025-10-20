<?php

namespace App\Repositories;

use App\Interface\UserInterface;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository implements UserInterface
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function users($request): LengthAwarePaginator
    {
        return $this->user->with('roles')->paginate(25);
    }
}
