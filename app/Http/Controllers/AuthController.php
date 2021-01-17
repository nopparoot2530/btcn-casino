<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Firebase\JWT\JWT;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create a nice new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    protected function jwt(User $user)
    {

        $payload = [
            'iss' => "https://bitcoincasinolists.com", // Issuer of the token
            'sub' => $user->id, // Subject of the token
            'iat' => time(), // Time when JWT was issued.
            'exp' => time() + 86400 // Expiration time
        ];

        // As you can see we are passing `JWT_SECRET` as the second parameter that will
        // be used to decode the token in the future.
        return JWT::encode($payload, env('JWT_SECRET'));
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'password' => 'required'
        ]);

        $input = $request->only('name', 'password');
        $authorized = Auth::attempt($input);

        if (!$authorized) {

            $code = 401;
            $output = [
                'code' => $code,
                'message' => 'invalid password or name'
            ];
            return response($output, $code);
        } else {
            $user = User::where('name', $request->input('name'))->first();
            return response()->json(['token' => $this->jwt($user)]);
        }
    }

    public function me()
    {
        return Auth::user();
    }
}
