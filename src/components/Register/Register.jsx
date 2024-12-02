import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xác thực form bằng Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    username: Yup.string().required("Tên đăng nhập là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const handleRegister = (values) => {
    const newUser = {
      email: values.email,
      name: values.username,
      password: values.password,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <section className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <img
            src="https://via.placeholder.com/150x50?text=iNET"
            alt="iNET"
            className="mb-4 mx-auto d-block"
          />
          <h5 className="card-title mb-4 text-center">Tạo tài khoản mới</h5>

          <Formik
            initialValues={{ email: "", username: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {() => (
              <Form>
                <div className="form-group text-left">
                  <label>Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Nhập email của bạn"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="form-group text-left mt-3">
                  <label>Tên đăng nhập</label>
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Nhập tên đăng nhập"
                  />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </div>

                <div className="form-group text-left mt-3">
                  <label>Mật khẩu</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>

                <div className="form-group text-left mt-3">
                  <label>Xác nhận mật khẩu</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Tạo tài khoản
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center mt-4">
            Bạn đã có tài khoản?
            <a className="btn-link link-signup" href="./login">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
