import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="bg-light text-dark p-1">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30SN4IsdK3J5FvD_6EFV8gvgZJvBB5XrpQA&s"
              alt="Logo"
              width="200"
            />
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Dịch vụ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Trung tâm kiếm thức
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Tên miền
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Thanh toán
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Hỗ trợ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contributors">
                  Cộng tác viên
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Khuyến mãi
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-dark bg-primary border-10"
                  onClick={() => (window.location.href = "/ticket")}
                >
                  Mở Ticket
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
