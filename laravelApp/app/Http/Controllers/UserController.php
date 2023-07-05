<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index()
    {
        $users = User::get();
        $sendingUser = array();
        foreach ($users as $user) {
            array_push($sendingUser, ["id" => $user->id, "name" => $user->name, "email" => $user->email]);
        }
        return response()->json($sendingUser);
    }

    public function store(Request $request)
    {
        $newUser = new User();
        $newUser->name = $request->name ? $request->name : "Dummy Name";
        $newUser->email = $request->email ? $request->email : "Dummy E-mail";
        $newUser->password = $request->password ? bcrypt($request->password) : "Dummy Password";
        if ($newUser->save()) {
            $user = User::latest()->first();
            return response()->json(["data" => ["id" => $user->id], "message" => "User is created successfull"]);
        } else {
            return response()->json(["message" => "Failed to create user"]);
        }
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        if (!$user) {
            return response()->json(["message" => "404 user not found"]);
        }
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if (!$user) {
            return response()->json(["message" => "404 user not found"]);
        }
        $user->update($request->all());
        return response()->json($user);
    }
}
