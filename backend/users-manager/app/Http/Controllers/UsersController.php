<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserPostRequest;
use App\Services\UsersService;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    protected $usersService;

    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }

    public function get(): JsonResponse
    {
        return response()->json($this->usersService->getAll(), 200);
    }

    public function create(UserPostRequest $request): JsonResponse
    {
        $user = $this->usersService->create($request);

        if ($user != null) {
            return response()->json($user, 201);
        }

        return response()->json([
            'error' => "Could not register the user, try again later"
        ], 503);
    }
}
