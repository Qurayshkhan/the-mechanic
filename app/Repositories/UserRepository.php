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
        $data['password'] = Hash::make($data['password']);
        $user = $this->user->create($data);

        if (!empty($data['role'])) {
            $user->assignRole($data['role']);
        }


        return $user;
    }

    public function update(User $user, array $data): User
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'phone_no' => $data['phone_no'] ?? null,
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        $user->update($updateData);

        if (!empty($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

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
