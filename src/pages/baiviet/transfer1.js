import React from 'react';
import Sidebar from '../sidebar';
import domainPricingImage from '../../assets/download.png'; // Hình ảnh thứ nhất
import secondImage from '../../assets/doawn.png'; // Hình ảnh thứ hai

const Quick2 = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid">
        <div className="col-md-9 p-4">
          <h4><strong>Bảng giá tên miền và các loại phí</strong></h4>
          <p>Để xem bảng giá tên miền, vui lòng truy cập vào <a href="https://inet.vn/domain/bang-gia-ten-mien">iNET</a>.</p>

          <h5>1. Tên miền .VN</h5>
          <p>Tên miền .VN theo quy định sẽ được áp dụng các phí bao gồm Lệ phí đăng ký, Phí duy trì và phần Dịch vụ tài khoản quản trị tên miền.</p>

          <ul>
            <li>Lệ phí đăng ký: 200.000đ</li>
            <li>Phí duy trì: 350.000đ</li>
            <li>Dịch vụ tài khoản quản trị tên miền: 200.000đ</li>
          </ul>

          <h5>2. Tên miền .VN tiếng Việt</h5>
          <p>Tên miền .VN tiếng Việt miễn phí đăng ký.</p>

          <h5>3. Tên miền quốc tế (TLD)</h5>
          <p>Tên miền quốc tế chỉ có một phí duy trì hàng năm.</p>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Tên miền</th>
                <th>Phí đăng ký</th>
                <th>Phí duy trì năm 1</th>
                <th>Tổng phí</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>.vn</td>
                <td>200.000đ</td>
                <td>350.000đ</td>
                <td>770.000đ</td>
              </tr>
              <tr>
                <td>.com</td>
                <td>319.000đ</td>
                <td>329.000đ</td>
                <td>648.000đ</td>
              </tr>
            </tbody>
          </table>

          <p><strong>Lưu ý:</strong> Các tên miền quốc tế khi đăng ký cần tuân thủ chính sách đăng ký quốc tế.</p>

          {/* Thêm hình ảnh thứ nhất */}
          <div className="text-center my-4">
            <img 
              src={domainPricingImage} 
              alt="Bảng giá tên miền" 
              style={{ width: '550px', height: '250px' }} 
              className="img-fluid" 
            />
          </div>

          {/* Thêm hình ảnh thứ hai */}
          <div className="text-center my-4">
            <img 
              src={secondImage} 
              alt="Hình ảnh thứ hai" 
              style={{ width: '550px', height: '250px' }} 
              className="img-fluid" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quick2;
