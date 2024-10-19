import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";

import * as Yup from "yup";
import axios from "axios";
=======

import * as Yup from "yup";
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d

const YourComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [imageFields, setImageFields] = useState([0]); // Start with one image input

  const initialValues = {
    name: "Nguyễn Văn A",
    gmail: "nguyenvana@gmail.com",
<<<<<<< HEAD
    content:
=======
    wordContent:
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
      "Cho anh gặp lại em Trước khi mình cách xa Nửa quãng đời về sau Anh không phiền em nữa",
    images: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Họ và tên là bắt buộc")
      .min(2, "Họ và tên phải có ít nhất 2 ký tự"),

    gmail: Yup.string()
      .email("Email không hợp lệ")
      .required("Địa chỉ Email là bắt buộc"),

<<<<<<< HEAD
    content: Yup.string()
=======
    wordContent: Yup.string()
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
      .required("Nội dung là bắt buộc")
      .min(10, "Nội dung phải có ít nhất 10 ký tự"),

    images: Yup.array()
      .of(Yup.mixed().required("Hình ảnh là bắt buộc"))
      .min(1, "Phải có ít nhất một hình ảnh"),
<<<<<<< HEAD

    priority: Yup.string().required("Họ và tên là bắt buộc"),
=======
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
  });

  const handleSubmit = (values) => {
    // Your submit logic here
    console.log(values); // Just to check what values are submitted
    setShowForm(false); // Hide form after submission
  };

  const addImageField = () => {
    setImageFields([...imageFields, imageFields.length]);
  };

  const removeImageField = (index) => {
    setImageFields(imageFields.filter((_, i) => i !== index));
  };
  const navigate = useNavigate();

  return (
    <div className="row">
      {/* Left Column with Ticket Information */}
      <div className="col-md-4">
        <div className="card-body">
          <h4 style={{ color: "rgba(42, 98, 218, 0.503)" }}>
            Thông tin Ticket
          </h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  Requestor<br></br> Nguyễn Văn A
                </td>
              </tr>
              <tr>
                <td>
                  Phòng ban <br></br>Phòng Kỹ thuật
                </td>
              </tr>
              <tr>
                <td>
                  Ngày gửi <br></br>14/10/2021 (7:30 AM)
                </td>
              </tr>
              <tr>
                <td>
                  Lần cập nhật cuối <br></br>2 năm trước
                </td>
              </tr>
              <tr>
                <td>
                  Trạng thái/Mức độ ưu tiên <br></br>Cao
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Trả lời
        </button>
        <button type="button" className="btn btn-light">
          Đã đóng
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
            <button type="button" className="btn btn-light">
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
      </div>

      {/* Show the form or the response based on showForm state */}
      <div className="col-md-8">
        {showForm ? (
          <div className="card card-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form>
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
                          />
                          <ErrorMessage
                            name="gmail"
                            component="div"
                            className="text-danger"
                          />
                        </td>
                      </tr>

                      {/* Trường chọn mức độ ưu tiên */}
                      <tr>
                        <td colSpan="2">
<<<<<<< HEAD
                          <label htmlFor="priority">Trạng thái ưu tiên</label>
                          <Field
                            as="select"
=======
                          <label htmlFor="wordContent">Nội dung</label>
                          <Field
                            as="textarea"
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
                            className="form-control"
                            id="priority"
                            name="priority"
                          >
                            <option value="" label="Chọn trạng thái" />
                            <option value="high" label="Cao" />
                            <option value="medium" label="Trung bình" />
                            <option value="low" label="Thấp" />
                          </Field>
                          <ErrorMessage
                            name="priority"
                            component="div"
                            className="text-danger"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="2">
                          <label htmlFor="phongBan">Phòng ban</label>
                          <Field
                            as="select"
                            className="form-control"
                            id="phongBan"
                            name="phongBan"
                          >
                            <option value="" label="Chọn phòng ban" />
                            <option value="kythuat" label="Phòng Kỹ thuật" />
                            <option
                              value="hanhchinh"
                              label="Phòng Hành chính"
                            />
                            <option
                              value="kinhdoanh"
                              label="Phòng Kinh doanh"
                            />
                          </Field>
                          <ErrorMessage
                            name="phongBan"
                            component="div"
                            className="text-danger"
                          />
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="2">
                          <label htmlFor="content">Nội dung</label>
                          <Field
                            as="textarea"
                            className="form-control"
                            id="content"
                            name="content"
                            rows="16"
                            placeholder="Nhập nội dung..."
                          />
                          <ErrorMessage
<<<<<<< HEAD
                            name="content"
=======
                            name="wordContent"
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
                            component="div"
                            className="text-danger"
                          />
                        </td>
                      </tr>

                      {/* Multiple image inputs */}
                      {imageFields.map((field, index) => (
                        <tr key={index}>
                          <td colSpan="2">
                            <label htmlFor={`images[${index}]`}>
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
                                    event.currentTarget.files[0]
                                  );
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
<<<<<<< HEAD
                            // onClick={() => navigate("/ticketlist")}
=======
                            onClick={() => navigate("/ticketlist")}
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
                          >
                            Gửi
                          </button>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => setShowForm(false)}
                          >
                            Hủy bỏ
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="col-md-20" style={{ marginBottom: "50px" }}>
=======
          <div className="col-md-20">
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
            <div className="card card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ setFieldValue, isSubmitting, values }) => (
                  <Form>
                    <div
                      className="card card-body"
                      style={{ boxShadow: "-10px 0 0px  rgba(0, 0, 255)" }}
                    >
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th style={{ color: "rgba(42, 98, 218, 0.503)" }}>
                              Trả lời
                            </th>
                          </tr>
                          <tr>
                            <h6
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span>
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{ marginRight: "8px" }}
                                />
                                Trần Nguyên Bảo
                                <p
                                  style={{
                                    margin: 10,
                                    fontSize: "1Ìpx",
                                    color: "blue",
                                  }}
                                >
                                  Openrator
                                </p>
                              </span>
                              <span style={{ fontSize: "12px", color: "gray" }}>
                                12/12/2012 (12h)
                              </span>
                            </h6>
                            <p>Cảm ơn anh chúc anh một ngày năng lượng.</p>
                            <p>
                              Cám ơn quý khách đã tin tưởng và lựa chọn dịch vụ
                              tại AZDIGI. Chúc quý khách luôn luôn vui vẻ và
                              thành công trong công việc!
                            </p>
                            <p>
                              Trang trọng,
                              <br />
                              Nguyên Bảo
                              <br />
                              Technical
                            </p>
                            <p>
                              Supporter AZDIGI CORPORATION 768 Nguyễn Thị Định,
                              phường Thạnh Mỹ Lợi, TP Thủ Đức, TP Hồ Chi Minh
                              028 730 24768
                              <br />
                              Hướng dẫn sử dụng: https://huongdan.azdigi.com
                              <br />
                              Tin tức: https://blog.azdigi.com
                              <br />
                              Thông tin khuyến mãi: https://khuyenmai.azdigi.com
                            </p>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        <div className="col-md-20">
<<<<<<< HEAD
          <div className="card card-body" style={{ marginBottom: "50px" }}>
=======
          <div className="card card-body">
>>>>>>> 107b17e1d7e5efd2e60cbaa91660dc8d125dec9d
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form>
                  <div className="card card-body">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => navigate("/ticketlist")}
                    >
                      Xem danh sách Ticket đã gửi
                    </button>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <h6
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span>
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ marginRight: "8px" }}
                              />
                              Trần Văn B
                              <p
                                style={{
                                  margin: 10,
                                  fontSize: "1Ìpx",
                                  color: "gray",
                                }}
                              >
                                owner
                              </p>
                            </span>
                            <span style={{ fontSize: "12px", color: "gray" }}>
                              12/12/2012 (12h05)
                            </span>
                          </h6>
                          <p>Đã rõ.</p>
                          <p>Cám ơn kỉ thuật thiều</p>
                        </tr>
                      </thead>
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

export default YourComponent;
