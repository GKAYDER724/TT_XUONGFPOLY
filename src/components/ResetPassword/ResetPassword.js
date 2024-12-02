import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Mật khẩu và mật khẩu xác nhận không khớp.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/reset-password`,
        { token, email, password, password_confirmation: confirmPassword }
      );
      setMessage(response.data.message);
      setMessageColor("green");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        setMessage(error.response.data.message || "Đã xảy ra lỗi.");
      } else {
        setMessage("Đã xảy ra lỗi khi gửi yêu cầu.");
      }
      setMessageColor("red");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <img
            src="https://via.placeholder.com/150x50?text=iNET"
            alt="iNET"
            className="mb-4 mx-auto d-block"
          />
          <h5 className="card-title mb-4 text-center">Đặt Lại Mật Khẩu</h5>

          {message && (
            <div style={{ color: messageColor, marginBottom: "1em", textAlign: "center" }}>
              {message}
            </div>
          )}

          <form onSubmit={handleResetPassword}>
            <div className="form-group text-left">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                style={{ marginTop: "0.5em" }}
              />
            </div>
            <div className="form-group text-left mt-3">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                style={{ marginTop: "0.5em" }}
              />
            </div>
            <div className="form-group text-left mt-3">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-control"
                style={{ marginTop: "0.5em" }}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4">
              Đặt lại mật khẩu
            </button>
            {/* <Link to="/login" className="">
              Đăng nhập
            </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;