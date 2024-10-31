<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\AuthenticationMiddleware;
use App\Http\Middleware\AuthorizationMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/users', [UsersController::class, 'create']);

Route::post('/authenticate', [AuthenticationController::class, 'authenticate']);

Route::get('/users', [UsersController::class, 'get'])
->middleware(AuthenticationMiddleware::class)
->middleware(AuthorizationMiddleware::class);

Route::delete('/users/{id}', [UsersController::class, 'delete'])
->middleware(AuthenticationMiddleware::class);

Route::put('/users/{id}/address', [UsersController::class, 'updateAddress'])
->middleware(AuthenticationMiddleware::class);

Route::put('/users/{id}/phone', [UsersController::class, 'updatePhone'])
->middleware(AuthenticationMiddleware::class);

Route::delete('/users/{id}/address', [UsersController::class, 'deleteAddress'])
->middleware(AuthenticationMiddleware::class);

Route::delete('/users/{id}/phone', [UsersController::class, 'deletePhone'])
->middleware(AuthenticationMiddleware::class);