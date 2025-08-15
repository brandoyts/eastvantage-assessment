<?php

namespace App\Services;

use App\Contracts\Eloquent\UserRepositoryContract;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    private UserRepositoryContract $repository;


    public function __construct(UserRepositoryContract $repository)
    {
        $this->repository = $repository;
    }

    public function getAllUsers(): array
    {
        return $this->repository->findAll();
    }

    public function createUser(array $fields, array $roles): ?User
    {
        $user = $this->repository->create($fields);

        if (!$user) {
            return null;
        }

        $user->roles()->sync($roles);

        return $user->load("roles");
    }
}
