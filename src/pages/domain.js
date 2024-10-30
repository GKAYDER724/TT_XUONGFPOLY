
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa'; // Import icon thư mục
import Sidebar from './sidebar';
import axios from 'axios'; // Import axios để gọi API

const Domain = () => {

    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]); // Lưu trữ bài viết
    const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục được chọn

    useEffect(() => {
        // Gọi API để lấy dữ liệu danh mục
        axios.get('http://127.0.0.1:8000/api/Category')
            .then(response => {
                if (response.data.status) {
                    setCategories(response.data.data);
                }
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi gọi API:", error);
            });
    }, []);

    // Hàm để lấy danh sách bài viết của danh mục được chọn
    const fetchPosts = (category_id) => {
        axios.get(`http://127.0.0.1:8000/api/categories/${category_id}/posts`)
            .then(response => {
                if (response.data.status) {
                    setPosts(response.data['Bài viết']);
                    setSelectedCategory(response.data['Danh mục ']);
                }
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi gọi API lấy bài viết:", error);
            });
    };

    // Hàm đệ quy để hiển thị danh mục con
    const renderChildren = (children) => {
        return children.map(child => (
            <div key={child.id} className="ms-4"> {/* Dịch sang phải các danh mục con */}
                <div className="mb-2 d-flex align-items-center">
                    <FaFolder className="me-2 text-primary" /> {/* Icon thư mục */}
                    <Link to="#" onClick={() => fetchPosts(child.id)} className="text-dark fs-6 fw-bold">
                        {child.name} ({child.children_recursive.length} bài viết)
                    </Link>
                </div>
                {child.children_recursive.length > 0 && renderChildren(child.children_recursive)}
            </div>
        ));
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                {/* Sidebar */}

                {/* Content */}
                <div className="col-md-9 p-4">
                    {/* Danh sách danh mục cha và con */}
                    {categories.map((category) => (
                        <div key={category.id} className="mb-3">
                            <div className="mb-2 d-flex align-items-center">
                                <FaFolder className="me-2 text-primary" /> {/* Icon thư mục */}
                                <Link to="#" onClick={() => fetchPosts(category.id)} className="text-dark fs-5 fw-bold">
                                    {category.name}
                                </Link>
                            </div>
                            {/* Nếu danh mục cha có danh mục con, hiển thị chúng */}
                            {category.children_recursive.length > 0 && renderChildren(category.children_recursive)}
                        </div>
                    ))}

                    {/* Hiển thị danh sách bài viết khi chọn một danh mục */}
                    {selectedCategory && (
                        <div className="mt-4">
                            <h4><strong>{selectedCategory}</strong></h4>
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <div key={post.id} className="mb-3">
                                        <h5>{post.title}</h5>
                                        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                                        {/* Hiển thị file đính kèm nếu có */}
                                        {post.file_path.length > 0 && (
                                            <div>
                                                <strong>File đính kèm:</strong>
                                                <ul>
                                                    {post.file_path.map((file, index) => (
                                                        <li key={index}>
                                                            <a href={`http://127.0.0.1:8000/files/${file}`} target="_blank" rel="noopener noreferrer">
                                                                {post.file_name[file]}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>Không có bài viết nào.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Domain;
