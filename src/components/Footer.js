import React from 'react';
import '../css/Footer.css';

const Footer = () => {

  return (
    <footer className="bg-black text-light py-1 mt-auto">
       <div className="footer-inner">
            <div className="container">
                <div className="footer-sv-list">
                    <div className="grid-5 inet-grid">
                        <div className="item col-grid">
                            <h4>iNET</h4>
                            <ul className="list-link no-padding">
                                <li><a href="#">Về chúng tôi</a></li>
                                <li><a href="#">Liên hệ</a></li>
                                <li><a href="#">Hướng dẫn thanh toán</a></li>
                                <li><a href="#">Cam kết chất lượng dịch vụ</a></li>
                                <li><a href="#">Chính sách tích điểm</a></li>
                                <li><a href="#">Quy định hoàn tiền</a></li>
                                <li><a href="#">Văn bản pháp lý</a></li>
                                <li><a href="#">Tuyển dụng</a></li>
                                <li><a href="#">Bản tin</a></li>
                            </ul>
                        </div> 
                        <div className="item col-grid">
                            <h4>Hỗ trợ</h4>
                            <ul className="list-link no-padding">
                                <li><a href="#">Trung tâm hỗ trợ</a></li>
                                <li><a href="#">Thỏa thuận sử dụng</a></li>
                                <li><a href="#">Thỏa thuận bảo mật</a></li>
                                <li><a href="#">Quy định sử dụng tên miền</a></li>
                                <li><a href="#">Xử lý tranh chấp tên miền</a></li>
                                <li><a href="#">Báo cáo và xử lý lạm dụng</a></li>
                                <li><a href="#">Góp ý tên miền .VN</a></li>
                                <li><a href="#">Mẫu hợp đồng</a></li>
                                <li><a href="#">Chính sách thu thập, xử lý và bảo vệ dữ liệu cá nhân</a></li>
                            </ul>
                        </div>
                        <div className="item col-grid">
                            <h4>Công cụ</h4>
                            <ul className="list-link no-padding">
                                <li><a href="#">Whois tên miền</a></li>
                                <li><a href="#">Whois nhiều tên miền</a></li>
                                <li><a href="#">Lookup bản ghi tên miền</a></li>
                                <li><a href="#">Lookup thông tin IP</a></li>
                                <li><a href="#">Lookup thông tin Hosting</a></li>
                                <li><a href="#">OneMail</a></li>
                            </ul>
                        </div>
                        <div className="item col-grid">
                            <h4>Tiện ích</h4>
                            <ul className="list-link no-padding">
                                <li><a href="#">Ẩn thông tin tên miền</a></li>
                                <li><a href="#">Khóa tên miền</a></li>
                                <li><a href="#">Quản lý subdomain</a></li>
                                <li><a href="#">Tạo website thông báo</a></li>
                                <li><a href="#">Email Forwarding</a></li>
                                <li><a href="#">DNSSEC</a></li>
                                <li><a href="#">DNS miễn phí</a></li>
                            </ul>
                        </div>
                        <div className="item col-grid">
                            <h4>Dịch vụ</h4>
                            <ul className="list-link no-padding">
                                <li><a href="#">Tên miền</a></li>
                                <li><a href="#">Hosting</a></li>
                                <li><a href="#">Email</a></li>
                                <li><a href="#">Cloud VPS</a></li>
                                <li><a href="#">Cloud Server</a></li>
                                <li><a href="#">Website</a></li>
                                <li><a href="#">SSL</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ft-info">
                <div className="container">
                    <p className="copy-right">
                        <h6>
                        Copyright © 2018 
                        <a href="#" target="_blank">iNET</a> - Nhà đăng ký Tên miền Việt Nam và Quốc tế
                        </h6>
                    </p>
                </div>
            </div>
        </div>
    </footer>

  );
};

export default Footer;
