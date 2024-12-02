import React from 'react';
import { Link } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa'; // Import icon thư mục
import Sidebar from './sidebar';

const Transfer = () => {
    const transferSections = [
        {
            path: '/transfer1',
            title: 'Điều kiện chuyển nhượng',
        },
        {
            path: '/transfer2',
            title: 'Thủ tục chi phí',
        },
    ];

    return (
        <div className="d-flex">
            < Sidebar />
            <div className="container-fluid">
                {/* Sidebar */}

                {/* Content */}
                <div className="col-md-9 p-3">
                    <h4><strong>Chuyển nhượng</strong></h4>
                    <p>
                        Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.
                    </p>

                    {/* Danh sách các phần với biểu tượng thư mục */}
                    {transferSections.map((section, index) => (
                        <div key={index} className="mb-2 d-flex align-items-center">
                            <FaFolder className="me-2 text-primary" /> {/* Icon thư mục */}
                            <Link to={section.path} className="text-dark fs-6 fw-bold">
                                {section.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* Phần hiển thị nội dung bên phải */}
        </div>
    );
};

export default Transfer;
