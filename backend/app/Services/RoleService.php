<?php

namespace App\Services;

use App\Contracts\Eloquent\RoleRepositoryContract;

class RoleService
{
    private RoleRepositoryContract $repository;

    public function __construct(RoleRepositoryContract $repository)
    {
        $this->repository = $repository;
    }

    public function getAllRoles(): array
    {
        return $this->repository->findAll();
    }
}
