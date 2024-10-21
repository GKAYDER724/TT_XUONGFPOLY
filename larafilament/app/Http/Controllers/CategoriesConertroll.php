<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Post;


use Illuminate\Http\Request;

class CategoriesConertroll extends Controller
{
    public function index (){
        $categories = Category::whereNull('parent_id')->with(['children', 'children.children','post'])->get();
        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công',
            'data' => $categories
        ], 200);
    }
   

}
