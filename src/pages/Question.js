import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoadingOverlay from './LoadingOverlay';

const Question = () => {
    const { id } = useParams(); 
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCategory = async () => {
            // Đặt trạng thái loading trước khi bắt đầu fetch
            setLoading(true);

            // Thực hiện fetch với timeout 2 giây
            const timeout = setTimeout(() => {
                setLoading(false); // Ngừng loading sau 2 giây
            }, 2000);

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/Category/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const foundCategory = data.data.find(cat => cat.id === parseInt(id));
                setCategory(foundCategory);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu chi tiết danh mục:", error);
                setError(error.message); 
            } finally {
                clearTimeout(timeout); // Hủy bỏ timeout nếu đã hoàn thành trước 2 giây
                setLoading(false); // Kết thúc loading
            }
        };

        fetchCategory();
    }, [id]);

    if (loading) return <LoadingOverlay />; // Hiển thị lớp phủ khi loading

    if (error) {
        return <div>Error: {error}</div>; 
    }

    if (!category) {
        return <div>Danh mục không tồn tại.</div>; 
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <div className="col-md-9 p-4">
                    <h1>
                        <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
                        {category.name}
                    </h1>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 ? (
                            category.children_recursive.map((child) => (
                                <li key={child.id} className="fw-bold" style={{ paddingLeft: '20px' }}>
                                    <Link to={`/AnswerSheet/${child.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
                                        {child.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="fw-bold">Không có phiếu trả lời</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Question;
