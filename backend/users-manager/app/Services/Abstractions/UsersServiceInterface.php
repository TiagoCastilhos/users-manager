<?php

namespace App\Services\Abstractions;

use App\Http\Requests\UserPostRequest;
use App\Models\User;

interface UsersServiceInterface
{
    public function getAll(): iterable;
    public function create(UserPostRequest $request): ?User;
    public function delete(int $id): bool;
}
