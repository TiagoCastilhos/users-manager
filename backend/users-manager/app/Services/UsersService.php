<?php

namespace App\Services;

use App\Http\Requests\UserPostRequest;
use App\Services\Abstractions\UsersServiceInterface;
use App\Models\User;
use DB;
use Exception;

class UsersService implements UsersServiceInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getAll(): iterable
    {
        return User::all();
    }

    public function create(UserPostRequest $request): ?User
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

            return $user;
        } catch (Exception $e) {
            error_log($e->getMessage());
            DB::rollBack();
            return null;
        }
    }
}
