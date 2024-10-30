<?php

namespace App\Http\Controllers;
use App\Models\Category;
use App\Models\Post;


use Illuminate\Http\Request;

class CategoriesConertroll extends Controller
{
    public function index()
    {
        // Lấy tất cả các danh mục gốc (các danh mục không có parent_id)
        $categories = Category::whereNull('parent_id')
            ->with('childrenRecursive') // Sử dụng mối quan hệ đệ quy
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công',
            'data' => $categories
        ], 200);
    }
   

}
