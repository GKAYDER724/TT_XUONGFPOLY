<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{

    public function registers(Request $request)

    {

        $validateuser = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'number' => 'nullable|string|max:15',
                'department_id' => 'nullable|integer|exists:departments,id',

            ],
            [
                'email.unique' => 'Email đã tồn tại, vui lòng chọn email khác.',
            ]
        );

        // Kiểm tra xem có lỗi không
        if ($validateuser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateuser->errors()
            ], 401);
        }

        // Tạo người dùng mới
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'number' => $request->number,
            'department_id' => $request->department_id
        ]);

        // Trả về phản hồi
        return response()->json([
            'status' => true,
            'message' => 'thanh cong',
            'user' => $user,
            'token' => $user->createToken('API TOKEN')->plainTextToken
        ], 200);
    }

    public function logins(Request $request)
    {

        $validateUser = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required|min:6',
            ]
        );


        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateUser->errors()
            ], 401);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Đăng nhập thành công
            $user = User::where('email', $request->email)->first();

            if ($user) {
                // Kiểm tra trường id_is_leader
                // if ($user->id_is_leader == 0) {
                //     return response()->json([
                //         'status' => false,
                //         'message' => 'Bạn đã vào user.',
                //     ], 403);
                // }
                // if ($user->id_is_leader == 1){
                //     return response()->json([
                //         'status' => false,
                //         'message' => 'Bạn đã vào admin.',
                //     ], 403);
                // }

                return response()->json([
                    'status' => true,
                    'message' => 'Đăng nhập thành công',
                    'user' => $user,
                    'token' => $user->createToken('API TOKEN')->plainTextToken
                ], 200);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Email hoặc mật khẩu không đúng.',
            ], 401);
        }

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
