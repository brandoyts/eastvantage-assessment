<?php

namespace App\Contracts\Eloquent;

interface BaseRepositoryContract
{
    public function findAll(): array;
}
