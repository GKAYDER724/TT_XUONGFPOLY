<<<<<<< HEAD
import React from 'react';
import '../css/Footer.css';
=======
import React from "react";
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d

const Footer = () => {

  return (
<<<<<<< HEAD
    <footer className="bg-black text-light py-1 mt-auto">
       <div className="footer-inner">
            <div className="container" style={{ marginTop: '50px'}}>
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
=======
    <>
      <footer
        style={{
          backgroundColor: "black",
          padding: "20px 0",
          fontSize: "14px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5 style={{ color: "#fff" }}>iNET</h5>
              <ul className="list-unstyled" style={{ color: "#fff" }}>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Hướng dẫn thanh toán
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Cam kết chất lượng dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Chính sách tích điểm
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Quy định hoàn tiền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Văn bản pháp lý
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Tuyển dụng
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 style={{ color: "#fff" }}>Hỗ trợ</h5>
              <ul className="list-unstyled" style={{ color: "#fff" }}>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Trung tâm hỗ trợ
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Thỏa thuận sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Thỏa thuận bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Quy định sử dụng tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Xử lý tranh chấp tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Báo cáo và xử lý lạm dụng
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Góp ý tên miền .VN
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Mẫu hợp đồng
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Chính sách thu thập, xử lý và bảo vệ dữ liệu cá nhân
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 style={{ color: "#fff" }}>Công cụ</h5>
              <ul className="list-unstyled" style={{ color: "#fff" }}>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Whois tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Whois nhiều tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Lookup bản ghi tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Lookup thông tin IP
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Lookup thông tin Hosting
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    OneMail
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 style={{ color: "#fff" }}>Tiện ích</h5>
              <ul className="list-unstyled" style={{ color: "#fff" }}>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Ẩn thông tin tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Khóa tên miền
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Quản lý subdomain
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Tạo website thông báo
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    Email Forwarding
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    DNSSEC
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    DNS miễn phí
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
      </footer>
      <footer
        style={{ backgroundColor: "grey", padding: "20px 0", fontSize: "14px" }}
      >
        <div className="text-center">
          <p>&copy; 2018 iNET - Nhà đăng ký Tên miền Việt Nam và Quốc tế</p>
        </div>
      </footer>
    </>
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
  );
};

export default Footer;
