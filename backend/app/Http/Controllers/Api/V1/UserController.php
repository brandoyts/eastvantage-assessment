<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Response;

class UserController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->userService->getAllUsers();
        return response()->json($users, Response::HTTP_OK);
    }

    public function store(CreateUserRequest $request)
    {
        $validated = $request->validated();

        $user = $this->userService->createUser([
            "name" => $validated["name"],
            "email" => $validated["email"],
        ], $validated["roles"]);

        // no need to check if $user has value
        // exceptions are handle globally

        return response()->json($user, Response::HTTP_CREATED);
    }
}
