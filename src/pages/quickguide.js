import React from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaFolderOpen } from 'react-icons/fa'; // Import các icon cần thiết
import Sidebar from './sidebar';

const Quickguide = () => {
    const guides = [
        {
            path: '/quick1',
            title: 'Hướng dẫn whitelist email trên gmail',
           
        },
        {
            path: '/quick2',
            title: 'Hướng dẫn đăng ký email trên trang iNET',
        
        },
        {
            path: '/quick3',
            title: 'Hướng dẫn trỏ bản ghi dịch vụ email',
           
        },
    ];

    return (
        <div className="d-flex">
            < Sidebar />
            <div className="container-fluid">
                {/* Sidebar */}

                {/* Content */}
                <div className="col-md-9 p-3">
                    <h4>
                        <strong>Hướng dẫn nhanh </strong>
                    </h4>
                    <p>
                        Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.
                    </p>

                    {/* Danh sách các bài viết với biểu tượng thư mục */}
                    {guides.map((guide, index) => (
                        <div key={index} className="mb-2 d-flex align-items-center">
                            <FaFolder className="me-2 text-primary" /> {/* Icon thư mục */}
                            <Link to={guide.path} className="text-dark fs-6 fw-bold">
                                {guide.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {/* Phần hiển thị nội dung bên phải */}
        </div>
    );
};

export default Quickguide;
