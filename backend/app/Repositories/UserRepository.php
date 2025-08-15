<?php

namespace App\Repositories;

use App\Contracts\Eloquent\UserRepositoryContract;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class UserRepository implements UserRepositoryContract
{
    public function findAll(): array
    {
        try {
            return User::with("roles")->get()->toArray();
        } catch (Exception $e) {
            logger("failed to get all users: " . $e->getMessage());
            return [];
        }
    }

    public function findById(int $id): ?User
    {
        try {
            return User::with("roles")->find($id);
        } catch (Exception $e) {
            logger("failed to find user with id {$id}: " . $e->getMessage());
            return null;
        }
    }

    public function create(array $fields): User
    {
        DB::beginTransaction();

        try {
            $user = User::create($fields);
            DB::commit();
            return $user;
        } catch (Exception $e) {
            logger('user creation failed: ' . $e->getMessage());
            DB::rollback();
            throw new RuntimeException("user creation failed");
        }
    }
}
