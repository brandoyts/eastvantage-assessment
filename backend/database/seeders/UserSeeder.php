<?php

namespace Database\Seeders;

use App\Enums\RoleName;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                "name" => "Matt",
                "email" => "matt@mail.com",
                "roles" => [RoleName::ADMINISTRATOR, RoleName::AUTHOR, RoleName::EDITOR],
            ],
            [
                "name" => "Foggy",
                "email" => "foggy@mail.com",
                "roles" => [RoleName::EDITOR],
            ],
            [
                "name" => "Juan",
                "email" => "juan@mail.com",
                "roles" => [RoleName::AUTHOR],
            ],
            [
                "name" => "Karen user",
                "email" => "karen@mail.com",
                "roles" => [RoleName::SUBSCRIBER],
            ],
            [
                "name" => "Fisk",
                "email" => "fisk@mail.com",
                "roles" => [RoleName::ADMINISTRATOR],
            ],
        ];

        foreach ($users as $userData) {
            $rolesToAssign = $userData['roles'];
            unset($userData['roles']);

            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            $roleIds = Role::whereIn(
                'name',
                array_map(fn($role) => $role->value, $rolesToAssign)
            )->pluck('id')->toArray();

            $user->roles()->sync($roleIds); // populate pivot table
        }
    }
}
