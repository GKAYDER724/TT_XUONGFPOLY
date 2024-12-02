import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMedal } from "@fortawesome/free-solid-svg-icons";
// import './Contributors.css'; // Assuming you have a separate CSS file for styles

const Contributors = () => {
  return (
    <div className="container">
      {/* Banner Section */}
      <div className="banner text-center my-5">
        <h1>Nhận huê hồng khi giới thiệu bạn bè sử dụng AZDiGi!</h1>
        <p>Kích hoạt tài khoản cộng tác viên ngay để tăng thu nhập tự động.</p>
        <br />
        <button className="btn btn-primary">
          Đăng ký tham gia chương trình cộng tác viên
        </button>
      </div>

      {/* Card Section */}
      <div className="container">
  <div className="row my-5">
    {/* Card 1 */}
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-img-top text-center my-3">
          <FontAwesomeIcon icon={faMedal} size="4x" />
        </div>
        <div className="card-body text-center"> {/* Added text-center */}
          <h5 className="card-title">We track the visitors</h5>
          <h6 className="card-text">
            We track the visitors you refer to us using cookies, so users you refer don't have to purchase instantly for you to receive your commission.
          </h6>
          <p>Cookies last up to 90 days following the initial visit.</p>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-img-top text-center my-3">
          <FontAwesomeIcon icon={faEye} size="4x" />
        </div>
        <div className="card-body text-center"> {/* Added text-center */}
          <h5 className="card-title">We track the visitors</h5>
          <h6 className="card-text">
            We track the visitors you refer to us using cookies, so users you refer don't have to purchase instantly for you to receive your commission.
          </h6>
          <p>Cookies last up to 90 days following the initial liên hệ.</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Contributors;
