import React, { useState } from 'react';
import HeaderBottom from '../components/HeaderBottom';
import Container from 'react-bootstrap/Container';
import { FaListUl, FaTh } from 'react-icons/fa';
import '../css/Blog.css';

function MainContent() {
    const articles = [
        {
            title: "[CocCoc] Sử Dụng Hiệu Quả Đối Sánh Từ Khóa Phủ Định Trong Quảng Cáo Coccoc",
            image: "https://drive.inet.vn/uploads/hault@inet.vn/Coccoc/Quang-Cao-Coccoc.png",
            author: "hault"
        },
        {
            title: "iNET điều chỉnh giá dịch vụ Cloud VPS: Giá tốt hơn - Cấu hình không đổi",
            image: "https://drive.inet.vn/uploads/hault@inet.vn/key-coccoc.png",
            author: "Hồ Đức Trí"
        },
        {
            title: "Cách kiểm tra, tra cứu và đăng ký tên miền .ID.VN",
            image: "https://drive.inet.vn/uploads/trihd@inet.vn/doi-gia-vps/file-1691572802117_file-1691384346385_fb-(1200x628).png",
            author: "hault"
        },
        {
            title: "iNET phối hợp cùng Trung tâm Internet Việt Nam cấp phát miễn phí tên miền .BIZ.VN cho doanh nghiệp",
            image: "https://drive.inet.vn/uploads/hault@inet.vn/A%CC%89nh%20chu%CC%A3p%20Ma%CC%80n%20hi%CC%80nh%202023-04-13%20lu%CC%81c%2015.51.19.png",
            author: "hault"
        },
        {
            title: "Giá tốt hơn với dịch vụ Cloud VPS từ iNET",
            image: "https://drive.inet.vn/uploads/hault@inet.vn/file-1578105756596_325.jpg",
            author: "Hồ Đức Trí"
        },
        {
            title: "Giá tốt hơn với dịch vụ Cloud VPS từ iNET",
            image: "https://drive.inet.vn/uploads/hault@inet.vn/file-1578105756596_325.jpg",
            author: "Hồ Đức Trí"
        }
    ];

    const art = [
        {
          title: "Command line là gì? Tìm hiểu về Command line",
          imgSrc: "https://drive.inet.vn/uploads/dungna@inet.vn/Command-Line-881x441-1%20copy.png",
          authorName: "KAYER TYK",
          authorImg: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474087Gpm/avatar-anime-nam-cute-dang-yeu_042810087.jpg",
          date: "01/10/2024 09:41:28",
          content: `Một công cụ mạnh mẽ trong thế giới công nghệ, cho phép người dùng tương tác trực
          tiếp với hệ điều hành thông qua các lệnh văn bản và được rất nhiều người sử dụng...`,
        },
        
        
        // Thêm các bài viết khác vào đây...
    ];
      

    const [isGridView, setIsGridView] = useState(false); // State to manage view mode

    return (
        <>
        <HeaderBottom />
        <section className="body-container">
            <div className="blog-main">
                <div className="grid">
                    {articles.map((article, index) => (
                        <div key={index} className="grid-item">
                            <img src={article.image} alt={article.title} />
                            <div className="overlay">
                                <h5>{article.title}</h5>
                                <p>{article.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='row'>
                <h2>Blog</h2>
                <div className='top-heading-group line-through'>
                    <p className='total-element'>
                        <span>
                        Có <strong>1001</strong> bài viết
                        </span>
                    </p>
                    <div className='view-option text-right'>
                        <small>Hiển thị bài viết dưới dạng:</small>
                        <button
                            title="Danh sách"
                            className={`only-icon ${!isGridView ? 'active' : ''}`}
                            onClick={() => setIsGridView(false)} // Toggle to list view
                        >
                            <FaListUl /> {/* List icon */}
                        </button>
                        
                        <button
                            title="Lưới"
                            className={`only-icon ${isGridView ? 'active' : ''}`}
                            onClick={() => setIsGridView(true)} // Toggle to grid view
                        >
                            <FaTh /> {/* Grid icon */}
                        </button>
                    </div>
                </div>
                <div className="sr-info sr-article" view-grid='none'>
                    {art.map((article, index) => (
                        <div key={index} className="article-item" view-grid="items">
                        <figure className="figure-thumbnail clearfix">
                            <div className="thumbnail">
                                <img src={article.imgSrc} alt={article.title} style={{ width: '200px' }} />
                            </div>
                            <figcaption>
                                <h6 className="no-top-margin">
                                    <a href="#">{article.title}</a>
                                </h6>
                                <p>
                                    <span className="acc-group">
                                    <img src={article.authorImg} alt={article.authorName} style={{ width: '30px' }} />
                                    <a href="#">{article.authorName}</a>
                                    </span>
                                    <span className="short-info">
                                    <span className="post-date">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                        </svg>
                                        {article.date}
                                    </span>
                                    </span>
                                </p>
                                <p className="txt-content">
                                    <span>{article.content}</span>
                                    <a href="#">
                                    Xem tiếp
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                    </a>
                                </p>
                                <div className="tag-more-action-group">
                                    <div className="tag-group">
                                    <span className="tag-group-title">Tags:</span>
                                    <a className="tag-item" href="#">Chia sẻ</a>
                                    </div>
                                    <div className="more-action-group">
                                    <a className="comment-link" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right-dots-fill" viewBox="0 0 16 16">
                                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                        </svg>
                                        Bình luận
                                    </a>
                                    <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                        </svg>
                                    </a>
                                    <span className="dropdown" style={{ display: 'flex', alignItems: 'center' }}>
                                        <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                        </svg>
                                        </a>
                                        <ul className="dropdown-menu">
                                        <li>
                                            <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
                                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.17.86.17 1.288l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                                            </svg>
                                            Sao chép link
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                                                <path d="M15 8a1 1 0 0 0-1-1H9.414L12.707 4.707a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L9.414 9H14a1 1 0 0 0 1-1"/>
                                            </svg>
                                            Chia sẻ
                                            </a>
                                        </li>
                                        </ul>
                                    </span>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                        </div>
                    ))}
                </div>
                <br></br>
            </div>  
        </section>
        </>
    );
}

export default MainContent;
