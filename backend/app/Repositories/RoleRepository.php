<?php

namespace App\Repositories;

use App\Contracts\Eloquent\RoleRepositoryContract;
use App\Models\Role;

class RoleRepository implements RoleRepositoryContract
{
    public function findAll(): array
    {
        return Role::all()->toArray();
    }
}
