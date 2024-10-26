<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserPostRequest;
use App\Models\User;
use DB;
use Exception;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    public function get(): JsonResponse
    {
        return response()->json(User::all(), 200);
    }

    public function create(UserPostRequest $request): JsonResponse
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                "first_name" => $request->firstName,
                "last_name" => $request->lastName,
                "user_name" => $request->userName,
                "birth_date" => $request->birthDate,
                "email" => $request->email,
                "password" => $request->password,
            ]);

            DB::commit();

            return response()->json($user, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => "Could not register the user, try again later",
                'exception' => $e->getMessage(),
            ], 503);
        }
    }
}
