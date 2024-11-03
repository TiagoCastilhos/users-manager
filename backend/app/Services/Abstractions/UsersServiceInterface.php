<?php

namespace App\Services\Abstractions;

use App\Http\Requests\AddressRequest;
use App\Http\Requests\PhoneRequest;
use App\Http\Requests\UserPostRequest;
use App\Http\Requests\UserPutRequest;
use App\Models\User;
use App\Models\Phone;
use App\Models\Address;

interface UsersServiceInterface
{
    public function getAll(): iterable;
    public function create(UserPostRequest $request): ?User;
    public function update(UserPutRequest $request, int $userId): ?User;
    public function delete(int $id): bool;
    public function getPhone(int $userId): ?Phone;
    public function upsertPhone(PhoneRequest $phone, int $userId): bool;
    public function deletePhone(int $userId): bool;
    public function getAddress(int $userId): ?Address;
    public function upsertAddress(AddressRequest $address, int $userId): bool;
    public function deleteAddress(int $userId): bool;
}
