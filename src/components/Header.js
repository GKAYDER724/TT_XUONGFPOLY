import React from 'react';

const Header = () => {
    
  return (
    <header className="bg-light text-dark p-1">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30SN4IsdK3J5FvD_6EFV8gvgZJvBB5XrpQA&s" alt="Logo" width="200" />
          </div>
          <nav>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Dịch vụ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Tên miền</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Thanh toán</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Hỗ trợ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Cộng tác viên</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark" href="/">Khuyến mãi</a>
                </li>
                <li className="nav-item">
                    <button className="nav-link text-dark bg-primary border-10" onClick={() => window.location.href = '/ticket'}>
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
