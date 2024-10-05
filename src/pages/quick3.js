import React, { useState } from 'react';

import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
const Quick3 = () => {
    return (
        <div className="d-flex">
            < Sidebar />
            <div className="container-fluid">

                {/* Sidebar */}


                {/* Content */}
                <div className="col-md-9 p-4">

                    <h4><strong>Hướng dẫn trỏ bản ghi dịch vụ email</strong></h4>
                    <p>
                        Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.
                    </p>
                    Hướng dẫn Whitelist Email trên Gmail
                    Bước 1: Đăng nhập vào tài khoản Gmail của bạn

                    Mở trình   Hướng dẫn Whitelist Email trên Gmail
                    Bước 1: Đăng nhập vào tài khoản Gmail của bạn

                    Mở trình duyệt web và truy cập vào Gmail.
                    Nhập địa chỉ email và mật khẩu của bạn để đăng nhập.
                    Bước 2: Truy cập vào phần Cài đặt

                    Nhấp vào biểu tượng Bánh răng ở góc trên bên phải.
                    Chọn Xem tất cả cài đặt từ menu thả xuống.
                    Bước 3: Thêm địa chỉ email vào danh sách cho phép

                    Trong tab Filters and Blocked Addresses (Bộ lọc và Địa chỉ Bị chặn), cuộn xuống và nhấp vào Create a new filter (Tạo bộ lọc mới).
                    Trong hộp thoại hiện ra, bạn có thể nhập địa chỉ email mà bạn muốn whitelist vào ô From (Từ). Ví dụ: example@example.com.
                    Nhấn nút Create filter (Tạo bộ lọc).
                    Bước 4: Chọn hành động cho bộ lọc

                    Trong bước này, bạn sẽ thấy các tùy chọn để xử lý email từ địa chỉ đã nhập.
                    Để whitelist, hãy chọn Never send it to Spam (Không bao giờ gửi vào Spam). Bạn cũng có thể chọn Always mark it as important (Luôn đánh dấu là quan trọng) nếu muốn.
                    Nhấn vào Create filter (Tạo bộ lọc) để hoàn tất.
                    Bước 5: Kiểm tra lại cài đặt

                    Để chắc chắn rằng địa chỉ email đã được whitelist, bạn có thể gửi một email từ địa chỉ đó và kiểm tra xem nó có đến hộp thư đến của bạn hay không.
                    Lưu ý
                    Nếu bạn whitelist một miền (domain) thay vì một địa chỉ email cụ thể, bạn có thể nhập @example.com vào ô From. Điều này sẽ cho phép tất cả email từ miền đó.  Hướng dẫn Whitelist Email trên Gmail
                    Bước 1: Đăng nhập vào tài khoản Gmail của bạn

                    Mở trình duyệt web và truy cập vào Gmail.
                    Nhập địa chỉ email và mật khẩu của bạn để đăng nhập.
                    Bước 2: Truy cập vào phần Cài đặt

                    Nhấp vào biểu tượng Bánh răng ở góc trên bên phải.
                    Chọn Xem tất cả cài đặt từ menu thả xuống.
                    Bước 3: Thêm địa chỉ email vào danh sách cho phép

                    Trong tab Filters and Blocked Addresses (Bộ lọc và Địa chỉ Bị chặn), cuộn xuống và nhấp vào Create a new filter (Tạo bộ lọc mới).
                    Trong hộp thoại hiện ra, bạn có thể nhập địa chỉ email mà bạn muốn whitelist vào ô From (Từ). Ví dụ: example@example.com.
                    Nhấn nút Create filter (Tạo bộ lọc).
                    Bước 4: Chọn hành động cho bộ lọc

                    Trong bước này, bạn sẽ thấy các tùy chọn để xử lý email từ địa chỉ đã nhập.
                    Để whitelist, hãy chọn Never send it to Spam (Không bao giờ gửi vào Spam). Bạn cũng có thể chọn Always mark it as important (Luôn đánh dấu là quan trọng) nếu muốn.
                    Nhấn vào Create filter (Tạo bộ lọc) để hoàn tất.
                    Bước 5: Kiểm tra lại cài đặt

                    Để chắc chắn rằng địa chỉ email đã được whitelist, bạn có thể gửi một email từ địa chỉ đó và kiểm tra xem nó có đến hộp thư đến của bạn hay không.
                    Lưu ý
                    Nếu bạn whitelist một miền (domain) thay vì một địa chỉ email cụ thể, bạn có thể nhập @example.com vào ô From. Điều này sẽ cho phép tất cả email từ miền đó.n Cài đặt

                    Nhấp vào biểu tượng Bánh răng ở góc trên bên phải.
                    Chọn Xem tất cả cài đặt từ menu thả xuống.
                    Bước 3: Thêm địa chỉ email vào danh sách cho phép

                    Trong tab Filters and Blocked Addresses (Bộ lọc và Địa chỉ Bị chặn), cuộn xuống và nhấp vào Create a new filter (Tạo bộ lọc mới).
                    Trong hộp thoại hiện ra, bạn có thể nhập địa chỉ email mà bạn muốn whitelist vào ô From (Từ). Ví dụ: example@example.com.
                    Nhấn nút Create filter (Tạo bộ lọc).
                    Bước 4: Chọn hành động cho bộ lọc

                    Trong bước này, bạn sẽ thấy các tùy chọn để xử lý email từ địa chỉ đã nhập.
                    Để whitelist, hãy chọn Never send it to Spam (Không bao giờ gửi vào Spam). Bạn cũng có thể chọn Always mark it as important (Luôn đánh dấu là quan trọng) nếu muốn.
                    Nhấn vào Create filter (Tạo bộ lọc) để hoàn tất.
                    Bước 5: Kiểm tra lại cài đặt

                    Để chắc chắn rằng địa chỉ email đã được whitelist, bạn có thể gửi một email từ địa chỉ đó và kiểm tra xem nó có đến hộp thư đến của bạn hay không.
                    Lưu ý
                    Nếu bạn whitelist một miền (domain) thay vì một địa chỉ email cụ thể, bạn có thể nhập @example.com vào ô From. Điều này sẽ cho phép tất cả email từ miền đó.

                </div>
            </div>
            {/* Phần hiển thị nội dung bên phải */}

        </div>
    );
};

export default Quick3;
