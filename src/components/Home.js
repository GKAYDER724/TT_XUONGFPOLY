import React from 'react';
import Sidebar from '../pages/Sidebar';
import MainContent from '../pages/MainContent';
import '../App.css';

const Home = () => {
  return (
    <div className="main-body">
      <div className="container">
        <header className="header">
            <div className="container">
                <h1>Trang chính</h1>
                <nav className="breadcrumb">
                    <a href="#">Trang chủ</a> &gt;
                    <span>Trang khách hàng</span>
                </nav>
            </div>
        </header><MainContent />
        <div className="main-grid">
          <Sidebar />
        </div>
      </div>
    </div>
    
    
  );
};

export default Home;