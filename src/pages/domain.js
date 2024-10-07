import React from 'react';
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa'; // Import icon thư mục
import Sidebar from './sidebar';

const Domain = () => {
    const domainSections = [
        {
            path: '/quickguide',
            title: 'Hướng dẫn nhanh',
            count: 3, // Số bài viết
        },
        {
            path: '/transfer',
            title: 'Chuyển nhượng',
            count: 2, // Số bài viết
        },
    ];

    return (
        <div className="d-flex">
            < Sidebar />
            <div className="container-fluid">
                {/* Sidebar */}

                {/* Content */}
                <div className="col-md-9 p-4">
                    <h4><strong>Tên miền</strong></h4>
                    <p>
                        Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.
                    </p>

                    {/* Danh sách các phần với biểu tượng thư mục và số lượng bài viết */}
                    {domainSections.map((section, index) => (
                        <div key={index} className="mb-2 d-flex align-items-center">
                            <FaFolder className="me-2 text-primary" /> {/* Icon thư mục */}
                            <Link to={section.path} className="text-dark fs-6 fw-bold">
                                {section.title} ({section.count} bài viết) {/* Hiển thị số lượng bài viết */}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* Phần hiển thị nội dung bên phải */}
        </div>
    );
};

export default Domain;
