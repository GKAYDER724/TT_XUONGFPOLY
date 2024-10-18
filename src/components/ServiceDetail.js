import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Import các hook cần thiết
import { Collapse } from 'react-bootstrap'; // Dùng Collapse từ react-bootstrap
import { FaCaretDown } from 'react-icons/fa'; // Import caret icon
import '../css/ServiceDetail.css'; // Import CSS

// SidebarMenu Component: Hiển thị danh mục và danh mục con
const SidebarMenu = ({ categories, open, toggleOpen, handleNavigation }) => {
    return (
        <ul className="sidebar-menu">
            {categories.map((category) => (
                <li key={category.id}>
                    <div className="menu-item" onClick={() => handleNavigation(`/category/${category.id}`)}>
                        {category.name}
                        {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 && (
                            <FaCaretDown
                                className={`caret-icon ${open[category.id] ? 'open' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn sự kiện click được kích hoạt hai lần
                                    toggleOpen(category.id);
                                }}
                            />
                        )}
                    </div>
                    {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 && (
                        <Collapse in={open[category.id]}>
                            <ul className="list-unstyled">
                                <SidebarMenu
                                    categories={category.children_recursive}
                                    open={open}
                                    toggleOpen={toggleOpen}
                                    handleNavigation={handleNavigation}
                                />
                            </ul>
                        </Collapse>
                    )}
                </li>
            ))}
        </ul>
    );
};

// ServiceDetail Component: Hiển thị chi tiết bài viết theo danh mục
const ServiceDetail = () => {
    const navigate = useNavigate(); // Để điều hướng giữa các trang
    const { id } = useParams(); // Lấy ID danh mục từ URL
    const [open, setOpen] = useState({}); // Trạng thái cho sidebar
    const [categories, setCategories] = useState([]); // Trạng thái lưu danh mục
    const [posts, setPosts] = useState([]); // Trạng thái lưu bài viết
    const [categoryName, setCategoryName] = useState(''); // Tên danh mục hiện tại
    const [loading, setLoading] = useState(true); // Trạng thái loading

    // Fetch danh mục từ API
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/Category")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.data.map(category => ({
                    ...category,
                    children_recursive: category.children_recursive || [] // Đảm bảo luôn có mảng con
                })) || []);
            })
            .catch((error) => console.error("Lỗi khi lấy dữ liệu categories:", error));
    }, []);

    // Fetch bài viết từ API khi có ID danh mục
    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/categories/${id}/posts`)
                .then((response) => response.json())
                .then((data) => {
                    setPosts(data.posts || []); // Lưu bài viết
                    setCategoryName(data.category || ''); // Lưu tên danh mục
                    setLoading(false); // Kết thúc trạng thái loading
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu posts:", error);
                    setLoading(false); // Xử lý lỗi và kết thúc trạng thái loading
                });
        }
    }, [id]);

    // Toggle trạng thái mở/đóng danh mục con trong Sidebar
    const toggleOpen = (id) => {
        setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    // Xử lý điều hướng đến trang danh mục
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <section>
            <div className="app-container">
                <div className="sidebar">
                    <SidebarMenu
                        categories={categories}
                        open={open}
                        toggleOpen={toggleOpen}
                        handleNavigation={handleNavigation}
                    />
                </div>
                <div className="content">
                    <div className="breadcrumb-search">
                        <div className="breadcrumb">
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg>
                                </Link>
                            </span>
                            <span> &gt; </span>
                            <span>{categoryName}</span> {/* Hiển thị tên danh mục */}
                        </div>
                        <div className="search-bar">
                            <input type="text" placeholder="Nhập từ khóa tìm kiếm..." />
                            <button type="button">🔍</button>
                        </div>
                    </div>

                    <div className="content-body">
                        <h1>{categoryName}</h1> {/* Hiển thị tiêu đề danh mục */}
                        {loading ? (
                            <p>Đang tải dữ liệu...</p>
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="post-item">
                                    <h2>{post.title}</h2> {/* Hiển thị tiêu đề bài viết */}
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* Nội dung bài viết */}
                                    {post.file_path.length > 0 && (
                                        <div className="post-images">
                                            {post.file_path.map((file, index) => (
                                                <img key={index} src={`http://127.0.0.1:8000/storage/${file}`} alt={post.file_name[file]} />
                                            ))}
                                        </div>
                                    )}
                                    <p>Ngày tạo: {new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>Không có bài viết</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetail;
