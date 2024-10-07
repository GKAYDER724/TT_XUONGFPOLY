import React, { useState } from "react";
import { Dropdown, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import "../css/ServiceDetail.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ items }) => {
  // State để theo dõi các mục nào đang được mở rộng
  const [collapsedItems, setCollapsedItems] = useState({});

  // Hàm để toggle (mở rộng hoặc thu gọn) một mục
  const toggleCollapse = (index) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Đảo ngược trạng thái mở rộng/thu gọn
    }));
  };

  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <div key={index} className="mb-2">
          {/* Phần header với tính năng click để mở rộng/thu gọn */}
          <div className="title">
            <h6
              className="cursor-pointer"
              onClick={() => toggleCollapse(index)}
            >
              {item.title}
            </h6>
          </div>
          {/* Kiểm tra trạng thái collapse để hiển thị subitems */}
          {!collapsedItems[index] && item.subitems && (
            <ul className="ml-4 no-bullets">
              {item.subitems.map((subitem, subindex) => (
                <li key={subindex} className="text-sm text-gray-600">
                  {typeof subitem === "string" ? (
                    subitem // Nếu là chuỗi, render trực tiếp
                  ) : (
                    <>
                      {/* Hiển thị subitem title */}
                      <span
                        className="cursor-pointer"
                        onClick={() => toggleCollapse(`${index}-${subindex}`)}
                      >
                        {subitem.title}
                      </span>

                      {/* Kiểm tra trạng thái collapse cho các children */}
                      {!collapsedItems[`${index}-${subindex}`] &&
                        subitem.children && (
                          <ul className="ml-4 no-bullets">
                            {subitem.children.map((child, childIndex) => (
                              <li
                                key={childIndex}
                                className="text-sm text-gray-600"
                              >
                                {typeof child === "string"
                                  ? child
                                  : child.title}
                              </li>
                            ))}
                          </ul>
                        )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

const ContentArea = ({ title, sections }) => (
  <div className="content-area">
    <div
      className="breadcrumb-section mb-4"
      style={{
        backgroundColor: "#2162f9",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Row className="d-flex justify-content-between align-items-center">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item active style={{ color: "#fff", display: 'flex', alignItems: 'center'  }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
              </svg>
            </Breadcrumb.Item>
            <Breadcrumb.Item active style={{ color: "#fff" }}>
              Dịch vụ cơ bản
            </Breadcrumb.Item>
            <Breadcrumb.Item active style={{ color: "#fff" }}>
              Tên miền
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs="auto">
          <Form inline className="d-flex">
            <Form.Control
              type="text"
              placeholder="Tìm và nhập từ khóa..."
              className="mr-2"
              active
              style={{ borderColor: "#fff", backgroundColor: "#334e8b" }}
            />
            <Button type="submit" variant="light" className="btn btn-primary">
              <i className="bi bi-search"></i> {/* Bootstrap search icon */}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>

    <h2>{title}</h2>
    {sections.map((section, index) => (
      <div key={index} className="mb-4">
        <h3>{section.title}</h3>
        <p>{section.description}</p>
      </div>
    ))}
  </div>
);

const ServiceDetail = () => {
  const sidebarItems = [
    {
      title: "Dịch vụ cơ bản",
      subitems: [
        {
          title: "Tên miền",
          children: [
            {
              title: "Quy trình & Quy chế",
              children: [
                "Đăng ký mới",
                "Chuyển nhượng tên miền",
                "Gia hạn và thu hồi",
              ],
            },
            "Hướng dẫn nhanh",
            "DNS & Trỏ bản ghi",
            "Chuyển nhà đăng ký",
            "Hỗ trợ tên miền miễn phí",
            "Dịch vụ cộng thêm",
            "Nâng cao",
          ],
        },
        "Hosting",
        "Email",
        "Cloud VPS",
        "Cloud Server",
        "SSL",
      ],
    },
    {
      title: "Dịch vụ khác",
      subitems: ["Backorder", "Sàn tên miền", "Google Workspace"],
    },
    {
      title: "Hệ thống",
      subitems: ["Tài khoản iNET", "Đại lý"],
    },
  ];

  const contentSections = [
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Tên miền
        </>
      ), // Added icon
      description:
        "Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Quy trình & Quy chế
        </>
      ), // Added icon
      description: "Các tài liệu về quy trình & quy chế của tên miền",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Đăng ký mới (11 bài viết)
        </>
      ), // Added icon
      description: "Các tài liệu về quy trình đăng ký tên miền",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Chuyển nhượng tên miền (10 bài
          viết)
        </>
      ), // Added icon
      description: "Các tài liệu về quy trình chuyển nhượng tên miền",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Gia hạn và thu hồi (4 bài viết)
        </>
      ), // Added icon
      description: "Các tài liệu về quy trình gia hạn và thu hồi tên miền",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Hướng dẫn nhanh (8 bài viết)
        </>
      ), // Added icon
      description: "Hướng dẫn đăng ký và sử dụng tên miền tại iNET",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> DNS & Trỏ bản ghi (19 bài viết)
        </>
      ), // Added icon
      description: "Hướng dẫn quản lý DNS và bản ghi tên miền",
    },
    {
      title: (
        <>
          <i className="bi bi-folder2-open"></i> Chuyển nhà đăng ký (2 bài viết)
        </>
      ), // Added icon
      description: "Hướng dẫn tên miền về iNET hoặc qua các nhà đăng ký khác",
    },
  ];

  return (
    <div className="flex">
      <div className="flex-body">
        <Sidebar items={sidebarItems} />
        <ContentArea title="Tên miền" sections={contentSections} />
      </div>
    </div>
  );
};

export default ServiceDetail;
