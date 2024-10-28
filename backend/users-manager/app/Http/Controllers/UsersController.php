<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserPostRequest;
use App\Services\UsersService;
use Illuminate\Http\JsonResponse;
use Request;

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

    public function delete(Request $request, int $id): JsonResponse
    {
        $result = $this->usersService->delete($id);

        if ($result) {
            return response()->json([
                'id' => $id
            ], 200);
        }

        return response()->json([
            'error' => "Could not delete the user id $id"
        ], 400);
    }
}
