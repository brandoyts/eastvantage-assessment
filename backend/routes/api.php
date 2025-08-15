<?php

use App\Http\Controllers\Api\V1\GetRolesController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function () {
    Route::get("/roles", GetRolesController::class);

    Route::prefix("users")->group(function () {
        Route::get("/", [UserController::class, "index"]);
        Route::post("/", [UserController::class, "store"]);
    });
});
