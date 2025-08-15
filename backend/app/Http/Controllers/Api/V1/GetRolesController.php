<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetRolesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, RoleService $roleService)
    {
        $roles = $roleService->getAllRoles();
        return response()->json($roles, Response::HTTP_OK);
    }
}
