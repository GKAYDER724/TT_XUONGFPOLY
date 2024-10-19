import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xác thực form bằng Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
  });

  const handleLogin = (values) => {
    const newUser = {
      email: values.email,
      password: values.password,
    };
    loginUser(newUser, dispatch, navigate);
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

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {() => (
              <Form>
                <div className="form-group text-left">
                  <label>Email đăng nhập</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="form-group text-left mt-3">
                  <label>Mật khẩu</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div className="form-check mt-3 d-flex align-items-center">
                  <Field
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
              </Form>
            )}
          </Formik>

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
