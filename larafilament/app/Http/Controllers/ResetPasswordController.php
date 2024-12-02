<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
{
    // Validate the request
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
        'token' => 'required',
    ]);

    // Kiểm tra biến trong yêu cầu
    if (!$request->has(['email', 'password', 'password_confirmation', 'token'])) {
        return response()->json(['status' => false, 'message' => 'Thiếu thông tin yêu cầu.'], 400);
    }

    // Attempt to reset the password
    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return response()->json(['status' => true, 'message' => 'Mật khẩu đã được đặt lại thành công.'], 200);
    }

    return response()->json(['status' => false, 'message' => 'Có lỗi xảy ra trong quá trình đặt lại mật khẩu.'], 400);
}

}
