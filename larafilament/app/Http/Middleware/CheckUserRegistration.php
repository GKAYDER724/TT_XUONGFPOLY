<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRegistration
{
    public function handle(Request $request, Closure $next): Response
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn đã đăng nhập. Không thể đăng ký lại.'
            ], 403); // Mã 403 cho Forbidden
        }

        // Nếu chưa đăng nhập, cho phép tiếp tục yêu cầu
        return $next($request);
    }
}
