import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/login"; // API URL constant

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState({ type: "", text: "" }); // Combined message state
  const navigate = useNavigate(); 

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post(API_URL, { email, password });

      if (res.data && res.data.token) {
        // Store token and user name in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.userName); // Assuming the response includes the user's name
        setMessage({ type: "success", text: "Đăng nhập thành công!" });

        // Redirect to home page after login success
        // navigate("/home");
      } else {
        setMessage({ type: "error", text: "Đăng nhập thất bại!" });
      }
    } catch (error) {
      console.error("Login error: ", error);
      setMessage({ type: "error", text: "Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin." });
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
          <h5 className="card-title mb-4 text-center">
            Đăng nhập một tài khoản sử dụng cho tất cả các dịch vụ
          </h5>

          {/* Display messages */}
          {message.text && (
            <div className={`alert alert-${message.type === "success" ? "success" : "danger"} text-center`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-group text-left">
              <label>Email đăng nhập</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="form-group text-left mt-3">
              <label>Mật khẩu</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải chứa ít nhất 8 ký tự",
                  },
                  validate: {
                    hasNumber: (value) =>
                      /\d/.test(value) || "Mật khẩu phải chứa ít nhất 1 chữ số",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-check mt-3 d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label mb-0" htmlFor="rememberMe">
                Duy trì đăng nhập
              </label>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <button className="btn btn-link p-0">Quên mật khẩu?</button>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Đăng nhập
            </button>
          </form>

          <p className="text-center mt-4">
            Bạn chưa có tài khoản?
            <a className="btn-link link-signup" href="./register">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
