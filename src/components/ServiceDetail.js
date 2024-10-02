import React, { useState } from 'react';
import { Dropdown, Breadcrumb, Form, Row, Col, Button } from 'react-bootstrap';
import '../css/ServiceDetail.css';

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
          <div className='title'>
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
                  {typeof subitem === 'string' ? (
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
                      {!collapsedItems[`${index}-${subindex}`] && subitem.children && (
                        <ul className="ml-4 no-bullets">
                          {subitem.children.map((child, childIndex) => (
                            <li key={childIndex} className="text-sm text-gray-600">
                              {typeof child === 'string' ? child : child.title}
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
      <div className='breadcrum'>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Breadcrumb>
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
            title: 'Dịch vụ cơ bản', 
            subitems: [ 
                {
                    title: 'Tên miền',
                    children: [
                        {
                            title: 'Quy trình & Quy chế',
                            children: [
                                'Đăng ký mới',
                                'Chuyển nhượng tên miền',
                                'Gia hạn và thu hồi'
                            ],
                        },
                        'Hướng dẫn nhanh', 
                        'DNS & Trỏ bản ghi',
                        'Chuyển nhà đăng ký', 
                        'Hỗ trợ tên miền miễn phí', 
                        'Dịch vụ cộng thêm', 
                        'Nâng cao'
                    ]
                },
                'Hosting', 
                'Email', 
                'Cloud VPS', 
                'Cloud Server', 
                'SSL'
            ] 
        },
        { 
            title: 'Dịch vụ khác',
            subitems: [
              'Backorder',
              'Sàn tên miền',
              'Google Workspace'
            ]
        },
        { 
            title: 'Hệ thống', 
            subitems: [
              'Tài khoản iNET',
              'Đại lý'
            ]
        },
    ];

    const contentSections = [
        { 
            title: 'Tên miền', 
            description: 'Helpdesk iNET Domain - cung cấp các tips, các hướng dẫn cách sử dụng tên miền cũng như các chính sách về tên miền hiện hành.' 
        },
        { 
            title: 'Quy trình & Quy chế', 
            description: 'Các tài liệu về quy trình & quy chế của tên miền' 
        },
        { 
            title: 'Đăng ký mới (11 bài viết)', 
            description: 'Các tài liệu về quy trình đăng ký tên miền' 
        },
        { 
            title: 'Chuyển nhượng tên miền (10 bài viết)', 
            description: 'Các tài liệu về quy trình chuyển nhượng tên miền' 
        },
        { 
            title: 'Gia hạn và thu hồi (4 bài viết)', 
            description: 'Các tài liệu về quy trình gia hạn và thu hồi tên miền' 
        },
        { 
            title: 'Hướng dẫn nhanh (8 bài viết)', 
            description: 'Hướng dẫn đăng ký và sử dụng tên miền tại iNET' 
        },
        { 
            title: 'DNS & Trỏ bản ghi (19 bài viết)', 
            description: 'Hướng dẫn quản lý DNS và bản ghi tên miền' 
        },
        { 
            title: 'Chuyển nhà đăng ký (2 bài viết)', 
            description: 'Hướng dẫn tên miền về iNET hoặc qua các nhà đăng ký khác' 
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
