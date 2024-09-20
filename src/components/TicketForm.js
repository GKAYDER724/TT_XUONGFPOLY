import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const TicketForm = () => {

  return (
    <div className="container">
        <div className="row">
          {/* Left column for ticket information */}
          <div className="col-md-4">
            <div className="card card-body">
              <h4 style={{ color: "rgba(42, 98, 218, 0.503)" }}>
                Thông tin Ticket
              </h4>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Người yêu cầu</th>
                    <td>Nguyễn Văn A</td>
                  </tr>
                  <tr>
                    <th>Phòng ban</th>
                    <td>Phòng Kỹ thuật</td>
                  </tr>
                  <tr>
                    <th>Ngày gửi</th>
                    <td>14/10/2021 (7:30 AM)</td>
                  </tr>
                  <tr>
                    <th>Lần cập nhật cuối</th>
                    <td>2 năm trước</td>
                  </tr>
                  <tr>
                    <th>Trạng thái/Mức độ ưu tiên</th>
                    <td>Cao</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <button type="button" className="btn btn-primary">
              Trả lời
            </button>
            <button type="button" className="btn btn-light">
              đã đóng
            </button>
            <br />
            <br />
            <div>
              <label htmlFor="ccEmail">CC Recipients</label>
              <br />
              <br />
              <div className="d-flex align-items-center">
                <input
                  type="email"
                  className="form-control me-2"
                  id="ccEmail"
                  name="ccEmail"
                  placeholder="Enter email address"
                />
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    /* Implement addCC function */
                  }}
                >
                  Add
                </button>
              </div>
              <ul
                id="ccList"
                style={{ listStyleType: "none", padding: 0, marginTop: "10px" }}
              >
                {/* CC emails will appear here */}
              </ul>
            </div>

            {/* Vertical Support Menu (Left Column) */}
            <div className="col-md-6">
              <h5>Hỗ trợ</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Quản lý Ticket
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Thông báo
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Câu hỏi Thường gặp
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Tài nguyên
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Tình trạng server
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Mở Ticket
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column for the ticket reply form */}
          <div className="col-md-8">
            <div className="card card-body">
              <form>
                <div className="card card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ color: "rgba(42, 98, 218, 0.503)" }}>
                          Trả lời
                        </th>
                      </tr>
                      <tr>
                        <th style={{ color: "rgba(129, 129, 129, 0.503)" }}>
                          Họ và tên
                        </th>
                        <th style={{ color: "rgba(129, 129, 129, 0.503)" }}>
                          Địa chỉ Email
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            style={{
                              backgroundColor: "rgba(129, 129, 129, 0.105)",
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            id="gmail"
                            name="gmail"
                            required
                            style={{
                              backgroundColor: "rgba(129, 129, 129, 0.105)",
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <label
                            htmlFor="wordContent"
                            style={{ color: "rgba(129, 129, 129, 0.503)" }}
                          >
                            Nội dung
                          </label>
                          <textarea
                            className="form-control"
                            id="wordContent"
                            name="wordContent"
                            rows="16"
                            placeholder="Nhập nội dung..."
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <label
                            htmlFor="image"
                            style={{ color: "rgba(129, 129, 129, 0.503)" }}
                          >
                            Đính kèm
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              type="file"
                              className="form-control me-2"
                              id="image"
                              name="image"
                            />
                            <button type="button" className="btn btn-primary">
                              +Thêm
                            </button>
                          </div>
                          <p>
                            Hỗ trợ định dạng: .jpg, .jpeg, .pdf, .zip, .doc (max
                            file size: 1280MB)
                          </p>
                          <button type="button" className="btn btn-primary">
                            Gửi
                          </button>
                          <button type="button" className="btn btn-light">
                            Hủy bỏ
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TicketForm;