<?php

namespace App\Contracts\Eloquent;

use App\Models\User;

interface UserRepositoryContract extends BaseRepositoryContract
{
    public function findById(int $id): ?User;
    public function create(array $fields): User;
}
