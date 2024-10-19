<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

Route::get('/download/{filename}', function ($filename) {
    return Storage::disk('public')->download("uploads/posts/{$filename}");
})->name('file.download');

Route::get('/', function () {
    return view('welcome');
});
