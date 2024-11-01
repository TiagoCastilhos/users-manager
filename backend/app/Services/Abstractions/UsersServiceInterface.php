<?php

namespace App\Services\Abstractions;

use App\Http\Requests\AddressPutRequest;
use App\Http\Requests\PhonePutRequest;
use App\Http\Requests\UserPostRequest;
use App\Models\User;

interface UsersServiceInterface
{
    public function getAll(): iterable;
    public function create(UserPostRequest $request): ?User;
    public function delete(int $id): bool;
    public function upsertAddress(AddressPutRequest $address, int $userId): bool;
    public function upsertPhone(PhonePutRequest $phone, int $userId): bool;
    public function deleteAddress(int $userId): bool;
    public function deletePhone(int $userId): bool;
}
