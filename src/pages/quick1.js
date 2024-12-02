import React, { useEffect, useState } from 'react';

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]); // Lưu trữ danh sách bài viết
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading

  // Fetch dữ liệu từ API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/71/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Xem cấu trúc dữ liệu API trả về
        setPosts(data.posts || []); // Thiết lập danh sách bài viết (giả sử API trả về {posts: [...]})
        setLoading(false); // Tắt trạng thái loading sau khi dữ liệu được lấy
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setLoading(false); // Tắt trạng thái loading khi có lỗi
      });
  }, []);

  // Hiển thị loading trong khi dữ liệu đang được fetch
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="category-posts">
      <h2>Danh sách bài viết</h2>
      
      {/* Hiển thị danh sách bài viết */}
      <div className="posts">
        {posts.length === 0 ? (
          <p>Không có bài viết nào.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Ngày tạo: {new Date(post.created_at).toLocaleDateString()}</p>
              
              {/* Hiển thị tệp đính kèm */}
              {post.file_path && post.file_path.length > 0 && (
                <div>
                  {post.file_path.map((file, index) => (
                    <div key={index}>
                      <p>File đính kèm: {post.file_name[file]}</p>
                      <img 
                        src={`http://127.0.0.1:8000/uploads/${file}`} 
                        alt={post.file_name[file]} 
                        style={{ maxWidth: '200px', marginTop: '10px' }} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPosts;
