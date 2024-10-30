import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const AnswerSheet = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true); // Trạng thái loading để kiểm tra quá trình tải dữ liệu

    // Hàm tìm kiếm đệ quy để tìm danh mục theo ID
    const findCategoryById = (categories, targetId) => {
        for (let cat of categories) {
            if (cat.id === targetId) {
                return cat;
            }
            if (cat.children_recursive && cat.children_recursive.length > 0) {
                const foundInChildren = findCategoryById(cat.children_recursive, targetId);
                if (foundInChildren) {
                    return foundInChildren;
                }
            }
        }
        return null;
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/Category/`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    const foundCategory = findCategoryById(data.data, Number(id));
                    setCategory(foundCategory);
                }
            })
            .catch((error) => console.error("Lỗi khi lấy dữ liệu chi tiết danh mục:", error))
            .finally(() => setLoading(false)); // Kết thúc tải, đặt loading là false
    }, [id]);

 
    if (!category) {
        return <div>Danh mục với ID {id} không tồn tại.</div>;
    }

    const renderSubCategories = (subCategories) => {
        return (
            <ul className="list-unstyled">
                {subCategories.map((subCategory) => (
                    <li key={subCategory.id}>
                        <div style={{ paddingLeft: '20px' }}>
                            <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
                            <span className="fw-bold">
                                {Array.isArray(subCategory.children_recursive) && subCategory.children_recursive.length > 0 ? (
                                    subCategory.name
                                ) : (
                                    <Link to={`/Post/${subCategory.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {subCategory.name}
                                    </Link>
                                )}
                            </span>
                            {Array.isArray(subCategory.children_recursive) && subCategory.children_recursive.length > 0 && (
                                <div style={{ paddingLeft: '20px' }}>
                                    {renderSubCategories(subCategory.children_recursive)}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const subCategories = Array.isArray(category?.children_recursive) ? category.children_recursive : [];

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container-fluid">
                <div className="col-md-9 p-4">
                    <h2 className="fw-bold">
                        <i className="bi bi-folder" style={{ marginRight: '8px' }}></i>
                        {category.name || 'Danh mục không có tên'}
                    </h2>
                    {subCategories.length > 0 ? (
                        renderSubCategories(subCategories)
                    ) : (
                        <div>Không có mục con nào.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnswerSheet;
