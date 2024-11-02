<?php

namespace App\Services;

use App\Http\Requests\AddressRequest;
use App\Http\Requests\PhoneRequest;
use App\Http\Requests\UserPutRequest;
use App\Http\Requests\UserPostRequest;
use App\Models\Address;
use App\Models\Phone;
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
        return User::with([
            'phone',
            'address'
        ])->get();
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

    public function update(UserPutRequest $request, int $userId): ?User
    {
        $result = User::firstWhere('id', '=', $userId)?->update([
            "first_name" => $request->firstName,
            "last_name" => $request->lastName,
            "user_name" => $request->userName,
            "birth_date" => $request->birthDate,
            "email" => $request->email
        ], );

        if ($result) {
            return User::firstWhere("id", "=", $userId);
        }

        return null;
    }

    public function delete(int $id): bool
    {
        return User::destroy($id) > 0;
    }

    public function upsertAddress(AddressRequest $address, int $userId): bool
    {
        //ToDo: Use a transaction to avoid deleting an address and db failed to insert the new value
        if (!$this->deleteAddress($userId)) {
            return false;
        }

        $address = Address::create([
            "country" => $address->country,
            "state" => $address->state,
            "city" => $address->city,
            "user_id" => $userId
        ]);

        return true;
    }

    public function upsertPhone(PhoneRequest $phone, int $userId): bool
    {
        //ToDo: Use a transaction to avoid deleting a phone and db failed to insert the new value
        if (!$this->deletePhone($userId)) {
            return false;
        }

        $phone = Phone::create([
            "country_code" => $phone->countryCode,
            "area_code" => $phone->areaCode,
            "number" => $phone->number,
            "user_id" => $userId
        ]);

        return true;
    }

    public function deleteAddress(int $userId): bool
    {
        $user = User::firstWhere('id', '=', $userId);

        if ($user == null) {
            return false;
        }

        Address::where('user_id', '=', $userId)?->delete();
        return true;
    }

    public function deletePhone(int $userId): bool
    {
        $user = User::firstWhere('id', '=', $userId);

        if ($user == null) {
            return false;
        }

        Phone::where('user_id', '=', $userId)?->delete();
        return true;
    }
}
