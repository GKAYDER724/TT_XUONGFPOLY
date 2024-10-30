<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;

class PostController extends Controller
{
    public function getPostsByCategory($category_id)
    {
        $posts = Post::where('category_id', $category_id)
                    
                     ->get();

        $categoryName = Category::find($category_id)->name;

        return response()->json([
            'status' => true,
            'message' => 'Danh sách bài viết',
            'Danh mục ' => $categoryName, 
            'Bài viết' => $posts->map(function($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'file_path' => $post->file_path,
                    'Danh mục ' => $post->category->name, 
                    'created_at' => $post->created_at,
                    'updated_at' => $post->updated_at,
                    'file_name' => $post->file_name,
                ];
            })
        ], 200);
    }
}
