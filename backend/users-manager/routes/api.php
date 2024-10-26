<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/users', [ UsersController::class, 'get']);
Route::post('/users', [ UsersController::class, 'create']);