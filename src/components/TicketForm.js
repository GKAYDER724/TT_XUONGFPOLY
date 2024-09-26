import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormComponent = () => {
  const [imageFields, setImageFields] = useState([{ image: null }]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Tên không được chứa số và ký tự đặc biệt")
      .required("Họ và tên là bắt buộc")
      .min(2, "Tên quá ngắn"),
    gmail: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    wordContent: Yup.string()
      .required("Nội dung là bắt buộc")
      .min(20, "Nội dung quá ngắn"),
    images: Yup.array().of(
      Yup.mixed()
        .required("Đính kèm là bắt buộc")
        .test(
          "fileSize",
          "Kích thước tệp quá lớn, tối đa 1280MB",
          (value) => !value || (value && value.size <= 1280 * 1024 * 1024)
        )
    ),
  });

  // Initial form values
  const initialValues = {
    name: "",
    gmail: "",
    wordContent: "",
    images: imageFields.map(() => null),
  };

  // Form submission handler
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Data:", values);
    setSubmitting(false);
  };

  // Add new image input
  const addImageField = () => {
    setImageFields([...imageFields, { image: null }]);
  };

  // Remove image input by index
  const removeImageField = (index) => {
    const newImageFields = imageFields.filter((_, i) => i !== index);
    setImageFields(newImageFields);
  };

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
        <div className="col-md-8">
          <div className="card card-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true} // Reinitialize when imageFields change
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form>
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
                            <Field
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              style={{
                                backgroundColor: "#ffffff", // White background
                              }}
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </td>
                          <td>
                            <Field
                              type="text"
                              className="form-control"
                              id="gmail"
                              name="gmail"
                              style={{
                                backgroundColor: "#ffffff", // White background
                              }}
                            />
                            <ErrorMessage
                              name="gmail"
                              component="div"
                              className="text-danger"
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
                            <Field
                              as="textarea"
                              className="form-control"
                              id="wordContent"
                              name="wordContent"
                              rows="16"
                              placeholder="Nhập nội dung..."
                              style={{
                                backgroundColor: "#ffffff", // White background
                              }}
                            />
                            <ErrorMessage
                              name="wordContent"
                              component="div"
                              className="text-danger"
                            />
                          </td>
                        </tr>

                        {/* Multiple image inputs */}
                        {imageFields.map((field, index) => (
                          <tr key={index}>
                            <td colSpan="2">
                              <label
                                htmlFor={`images[${index}]`}
                                style={{ color: "rgba(129, 129, 129, 0.503)" }}
                              >
                                Đính kèm {index + 1}
                              </label>
                              <div className="d-flex align-items-center">
                                <input
                                  type="file"
                                  className="form-control me-2"
                                  id={`images[${index}]`}
                                  name={`images[${index}]`}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `images[${index}]`,
                                      event.target.files[0]
                                    );
                                  }}
                                  style={{
                                    backgroundColor: "#ffffff", // White background
                                  }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => removeImageField(index)}
                                >
                                  Xóa
                                </button>
                              </div>
                              <ErrorMessage
                                name={`images[${index}]`}
                                component="div"
                                className="text-danger"
                              />
                            </td>
                          </tr>
                        ))}

                        {/* Add new image field */}
                        <tr>
                          <td colSpan="2">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={addImageField}
                            >
                              + Thêm file
                            </button>
                          </td>
                        </tr>

                        {/* Submit and reset buttons */}
                        <tr>
                          <td colSpan="2">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                            >
                              Gửi
                            </button>
                            <button type="reset" className="btn btn-light">
                              Hủy bỏ
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
