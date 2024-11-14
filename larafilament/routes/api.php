<?php
use App\Http\Controllers\SupportTicketController;
use App\Http\Controllers\CategoriesConertroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Middleware\CheckUserRegistration;




Route::middleware([CheckUserRegistration::class])->group(function () {
    Route::post('register', [ApiController::class, 'registers']);
    Route::post('login', [ApiController::class, 'logins']);
    Route::post('Category', [CategoriesConertroll::class, 'index']);
    // Route::post('SupportTicket',[CategoriesConertroll::class, 'get']);
    Route::post('sp', [SupportTicketController::class, 'store']);
    // Route để gửi yêu cầu đặt lại mật khẩu
    Route::post('forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])
        ->name('password.email');
    // Route để reset password
    Route::post('reset-password', [ResetPasswordController::class, 'reset']);


    // Route::post();
    Route::post('categories/{category_id}/posts', [PostController::class, 'getPostsByCategory']);
    Route::get('users/{user_id}/support-tickets', [SupportTicketController::class, 'getTicketsByUser']);
    Route::get('support-tickets/{ticket_id}/replies', [SupportTicketController::class, 'getReplies']);
});


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
