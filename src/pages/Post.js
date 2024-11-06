import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../assets/Post.css'; // Đường dẫn đúng đến file CSS

const Article = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State để quản lý lightbox
    const [imageSrc, setImageSrc] = useState(null); // Lưu nguồn ảnh khi mở lightbox
    const [sidebarOpen, setSidebarOpen] = useState(false); // State để kiểm tra trạng thái đóng/mở của sidebar
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State để kiểm tra màn hình mobile

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}/posts`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPosts(data['Bài viết'] || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    // Xử lý nội dung HTML của bài viết
    const cleanContent = (content) => {
        return content
            .replace(/<figcaption[^>]*>.*?<\/figcaption>/g, '')
            .replace(/<figure[^>]*>/g, '')
            .replace(/<\/figure>/g, '')
            .replace(
                /<img[^>]*src="([^"]*)"[^>]*>/g,
                `<img style="max-width: 100%; height: auto; cursor: pointer;" src="$1" alt="Image" onclick="handleImageClick('$1')" />`
            )
            .trim();
    };

    // Mở lightbox khi nhấp vào ảnh
    const handleImageClick = (src) => {
        setImageSrc(src);
        setIsOpen(true);
    };

    // Cập nhật state isMobile khi thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
            <div className="d-flex">
                {/* Chỉ hiển thị icon đóng/mở khi đang ở mobile */}
                {isMobile && (
                    <button
                        className={`sidebar-toggle-icon ${sidebarOpen ? 'open' : ''}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                )}

                {/* Sidebar */}
                <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
                    <Sidebar />
                </div>

                {/* Nội dung chính */}
                <div className="container ms-3 col-md-9 p-4">
                    <h1 className="mt-6">Bài viết</h1>
                    {posts.length === 0 ? (
                        <div>Không có bài viết</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h3 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{post.title}</h3>
                                    <div
                                        className="card-text"
                                        dangerouslySetInnerHTML={{
                                            __html: cleanContent(post.content)
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                    {isOpen && (
                        <Lightbox
                            mainSrc={imageSrc}
                            onCloseRequest={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
    );
};

export default Article;
