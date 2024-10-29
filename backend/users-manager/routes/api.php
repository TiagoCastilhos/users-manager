<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/users', [ UsersController::class, 'get']);
Route::post('/users', [ UsersController::class, 'create']);
Route::delete('/users/{id}', [ UsersController::class, 'delete']);
Route::put('/users/{id}/address', [ UsersController::class, 'updateAddress']);
Route::put('/users/{id}/phone', [ UsersController::class, 'updatePhone']);
Route::delete('/users/{id}/address', [ UsersController::class, 'deleteAddress']);
Route::delete('/users/{id}/phone', [ UsersController::class, 'deletePhone']);