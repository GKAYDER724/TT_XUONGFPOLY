<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    protected $fillable = ['name', 'parent_id'];
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function post()
    {
        return $this->hasMany(Post::class);
    }
    // Hàm đệ quy để lấy tên danh mục với dấu phân biệt cha-con
    public static function getCategoriesWithIndentation($parentId = null, $level = 0)
    {
        $categories = self::where('parent_id', $parentId)->get();
        $categoryList = [];

        foreach ($categories as $category) {
            $indentation = str_repeat('-', $level); // Thêm dấu - dựa trên cấp độ
            $categoryList[$category->id] = $indentation . ' ' . $category->name;
            $categoryList += self::getCategoriesWithIndentation($category->id, $level + 1); // Gọi đệ quy cho danh mục con
        }

        return $categoryList;
    }
}
