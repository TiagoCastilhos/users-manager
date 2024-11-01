<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {
        $user = User::firstWhere('email', '=', $request->email);

        if ($user == null || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Could not find a user with the given credentials.'], 400);
        }

        $token = $user->createToken("access_token", ['*'], now()->addDay());

        return response(['token' => $token->plainTextToken, 'user' => $user], 200);
    }
}
