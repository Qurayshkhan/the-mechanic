<?php

namespace App\Repositories;

use App\Interface\UserInterface;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserInterface
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function users($request): LengthAwarePaginator
    {
        $query = $this->user->query();
        return $query->notAdmin()->select('id', 'name', 'email', 'phone_no', 'avatar')
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereLike('name', '%' . $search . '%')
                        ->orWhereLike('email', '%' . $search . '%')
                        ->orWhereLike('phone_no', '%' . $search . '%');
                });
            })
            ->with('roles')
            ->paginate(25);
    }

    public function create(array $data): User
    {
        return $this->user->create($data);
    }

    public function update(User $user, array $data): User
    {
        $user->update($data);
        return $user;
    }

    public function destroy(User $user): bool
    {
        return $user->delete();
    }

    public function getUserById(int $id)
    {
        return $this->user->find($id);
    }
}
