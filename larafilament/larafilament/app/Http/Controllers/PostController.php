<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Post;
// use Illuminate\Http\Request;

class PostController extends Controller
{
    public function poo (){
        $categories = Category::whereNull('parent_id')->with(['children', 'children.children','post'])->get();
        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công',
            'data' => $categories
        ], 200);
    }

}
