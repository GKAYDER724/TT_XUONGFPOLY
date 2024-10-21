<?php
use App\Http\Controllers\SupportTicketController;
use App\Http\Controllers\CategoriesConertroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\PostController;


Route::post('register', [ApiController::class, 'registers']);
Route::post('login',[ApiController::class, 'logins']);
Route::post('Category',[CategoriesConertroll::class, 'index']);
// Route::post('SupportTicket',[CategoriesConertroll::class, 'get']);
Route::post('sp', [SupportTicketController::class, 'store']);
// Route::post();
Route::post('PP',[PostController::class, 'poo']);





Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
