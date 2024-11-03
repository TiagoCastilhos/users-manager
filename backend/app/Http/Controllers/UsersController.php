<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Http\Requests\PhoneRequest;
use App\Http\Requests\UserPostRequest;
use App\Http\Requests\UserPutRequest;
use App\Services\UsersService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use UserResource;

class UsersController extends Controller
{
    protected $usersService;

    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }

    public function get(Request $request): JsonResponse
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

    public function update(UserPutRequest $request, int $id): JsonResponse
    {
        $user = $this->usersService->update($request, $id);

        if ($user != null) {
            return response()->json($user, 200);
        }

        return response()->json([
            'error' => "Could not find user $id"
        ], 404);
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

    public function getPhone(Request $request, int $id): JsonResponse
    {
        $result = $this->usersService->getPhone($id);

        return response()->json($result, 200);
    }

    public function updatePhone(PhoneRequest $request, int $id): JsonResponse
    {
        $result = $this->usersService->upsertPhone($request, $id);

        if ($result) {
            return response()->json([
                "id" => $id
            ], 201);
        }

        return response()->json([
            'error' => "Could not find user $id"
        ], 404);
    }

    public function deletePhone(Request $request, int $id): JsonResponse
    {
        $result = $this->usersService->deletePhone($id);

        if ($result) {
            return response()->json([
                "id" => $id
            ], 200);
        }

        return response()->json([
            'error' => "Could not find user $id"
        ], 404);
    }

    public function getAddress(Request $request, int $id): JsonResponse
    {
        $result = $this->usersService->getAddress($id);

        return response()->json($result, 200);
    }

    public function updateAddress(AddressRequest $request, int $id): JsonResponse
    {
        $result = $this->usersService->upsertAddress($request, $id);

        if ($result) {
            return response()->json([
                "id" => $id
            ], 201);
        }

        return response()->json([
            'error' => "Could not find user $id"
        ], 404);
    }

    public function deleteAddress(Request $request, int $id): JsonResponse
    {
        $result = $this->usersService->deleteAddress($id);

        if ($result) {
            return response()->json([
                "id" => $id
            ], 200);
        }

        return response()->json([
            'error' => "Could not find user $id"
        ], 404);
    }
}
