<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        // Validate the email address
        $request->validate(['email' => 'required|email']);

        // Lấy email từ request
        $email = $request->input('email');

        // Kiểm tra giá trị email
        Log::info('Email requested for password reset:', ['email' => $email]);

        if (empty($email)) {
            return response()->json([
                'status' => false,
                'message' => 'Email không được cung cấp.',
            ], 400);
        }

        // Kiểm tra xem email có tồn tại không
        $userExists = DB::table('users')->where('email', $email)->exists();
        if (!$userExists) {
            return response()->json([
                'status' => false,
                'message' => 'Email không tồn tại.',
            ], 404);
        }

        // Attempt to send the password reset link
        // Log::info('Sending password reset link for email:', ['email' => $email]);
        $status = Password::sendResetLink(['email' => $email]);

        // Ghi nhận trạng thái
        // Log::info('Password reset status:', ['status' => $status]);

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'status' => true,
                'message' => 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.',
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể gửi email đặt lại mật khẩu. Vui lòng kiểm tra email của bạn.',
            ], 400);
        }
    }
}
