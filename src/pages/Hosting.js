import React, { useState } from 'react';

import Sidebar from './sidebar';
const Hosting = () => {
    return (
        <div className="d-flex">
           < Sidebar/>
            <div className="container-fluid">

                {/* Sidebar */}


                {/* Content */}
                <div className="col-md-9 p-4">

                    <h4><strong>Hosting</strong></h4>
                    <p>
                        Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.
                    </p>

                 
                </div>
            </div>
            {/* Phần hiển thị nội dung bên phải */}

        </div>
    );
};

export default Hosting;
