import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Helpdesk = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng
  const [open, setOpen] = useState({
    domain: false,
    hosting: false,
    email: false,
    vps: false,
    server: false,
    ssl: false,
    others: false,
    system: false,
  });

  const [subOpen, setSubOpen] = useState({
    newRegistration: false,
    domainTransfer: false,
    hostingInfo: false,
    emailSetup: false,
    vpsInfo: false,
    serverInfo: false,
    sslInfo: false,
    otherInfo: false,
    systemInfo: false,
  });

  const [focusedItem, setFocusedItem] = useState('');

  const toggleOpen = (section) => {
    setOpen((prevState) => ({ ...prevState, [section]: !prevState[section] }));
  };

  const toggleSubOpen = (subSection) => {
    setSubOpen((prevState) => ({
      ...prevState,
      [subSection]: !prevState[subSection],
    }));
  };

  const handleNavigation = (path) => {
    setFocusedItem(path); // Cập nhật mục được focus
    navigate(path); // Điều hướng sang trang tương ứng
  };

  return (
    <div className="sidebar">
      {/* Tên miền */}
      <div className="mb-2">
        <p className={`toggle-section ${open.domain ? 'active' : ''}`}>
          <span onClick={() => handleNavigation('/domain')}>Tên miền</span>
          <FaCaretDown
            className={`caret-icon ${open.domain ? 'open' : ''}`}
            onClick={() => toggleOpen('domain')}
          />
        </p>
        <Collapse in={open.domain}>
          <ul className="list-unstyled">
            <li>
              <p className={`sub-toggle ${subOpen.newRegistration ? 'active' : ''}`}>
                <span onClick={() => handleNavigation('/quickguide')}>
                  Hướng dẫn nhanh
                </span>
                <FaCaretDown
                  className={`caret-icon ${subOpen.newRegistration ? 'open' : ''}`}
                  onClick={() => toggleSubOpen('newRegistration')}
                />
              </p>
              <Collapse in={subOpen.newRegistration}>
                <ul className="sub-list">
                  <li
                    className={focusedItem === '/domain/whitelist-email' ? 'focused' : ''}
                    onClick={() => handleNavigation('/quick1')}
                  >
                    Hướng dẫn whitelist email trên gmail
                  </li>
                  <li
                    className={focusedItem === '/domain/register-email' ? 'focused' : ''}
                    onClick={() => handleNavigation('/quick2')}
                  >
                    Hướng dẫn đăng ký email trên trang iNET
                  </li>
                  <li
                    className={focusedItem === '/domain/email-service' ? 'focused' : ''}
                    onClick={() => handleNavigation('/quick3')}
                  >
                    Hướng dẫn trỏ bản ghi dịch vụ email
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <p className={`sub-toggle ${subOpen.domainTransfer ? 'active' : ''}`}>
                <span onClick={() => handleNavigation('/transfer')}>Chuyển nhượng</span>
                <FaCaretDown
                  className={`caret-icon ${subOpen.domainTransfer ? 'open' : ''}`}
                  onClick={() => toggleSubOpen('domainTransfer')}
                />
              </p>
              <Collapse in={subOpen.domainTransfer}>
                <ul className="sub-list">
                  <li
                    className={focusedItem === '/domain/transfer-condition' ? 'focused' : ''} 
                    onClick={() => handleNavigation('/transfer1')}
                  >
                    Điều kiện chuyển nhượng
                  </li>
                  <li
                    className={focusedItem === '/domain/transfer-fee' ? 'focused' : ''} 
                    onClick={() => handleNavigation('/transfer2')}
                  >
                    Thủ tục và chi phí
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </Collapse>
      </div>

      {/* Hosting */}
      <p className={`toggle-section ${open.hosting ? 'active' : ''}`}>
        <span onClick={() => handleNavigation('/hosting')}>Hosting</span>
        <FaCaretDown
          className={`caret-icon ${open.hosting ? 'open' : ''}`}
          onClick={() => toggleOpen('hosting')}
        />
      </p>
      <Collapse in={open.hosting}>
        <ul className="list-unstyled">
          <li>
            <p className={`sub-toggle ${subOpen.hostingInfo ? 'active' : ''}`}>
              <span onClick={() => handleNavigation('/hosting/info')}>
                Thông tin hosting
              </span>
              <FaCaretDown
                className={`caret-icon ${subOpen.hostingInfo ? 'open' : ''}`}
                onClick={() => toggleSubOpen('hostingInfo')}
              />
            </p>
            <Collapse in={subOpen.hostingInfo}>
              <ul className="sub-list">
                <li
                  className={focusedItem === '/hosting/package' ? 'focused' : ''} 
                  onClick={() => handleNavigation('/hosting/package')}
                >
                  Gói dịch vụ
                </li>
                <li
                  className={focusedItem === '/hosting/features' ? 'focused' : ''} 
                  onClick={() => handleNavigation('/hosting/features')}
                >
                  Tính năng
                </li>
                <li
                  className={focusedItem === '/hosting/guide' ? 'focused' : ''} 
                  onClick={() => handleNavigation('/hosting/guide')}
                >
                  Hướng dẫn sử dụng
                </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </Collapse>

      {/* Email */}
      <p className={`toggle-section ${open.email ? 'active' : ''}`}>
        <span onClick={() => handleNavigation('/email')}>Email</span>
        <FaCaretDown
          className={`caret-icon ${open.email ? 'open' : ''}`}
          onClick={() => toggleOpen('email')}
        />
      </p>
      <Collapse in={open.email}>
        <ul className="list-unstyled">
          <li>
            <p className={`sub-toggle ${subOpen.emailSetup ? 'active' : ''}`}>
              <span onClick={() => handleNavigation('/email/setup')}>
                Thiết lập email
              </span>
              <FaCaretDown
                className={`caret-icon ${subOpen.emailSetup ? 'open' : ''}`}
                onClick={() => toggleSubOpen('emailSetup')}
              />
            </p>
            <Collapse in={subOpen.emailSetup}>
              <ul className="sub-list">
                <li
                  className={focusedItem === '/email/package' ? 'focused' : ''}
                  onClick={() => handleNavigation('/email/package')}
                >
                  Gói email
                </li>
                <li
                  className={focusedItem === '/email/features' ? 'focused' : ''}
                  onClick={() => handleNavigation('/email/features')}
                >
                  Tính năng
                </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </Collapse>

      {/* VPS */}
      <p className={`toggle-section ${open.vps ? 'active' : ''}`}>
        <span onClick={() => handleNavigation('/vps')}>VPS</span>
        <FaCaretDown
          className={`caret-icon ${open.vps ? 'open' : ''}`}
          onClick={() => toggleOpen('vps')}
        />
      </p>
      <Collapse in={open.vps}>
        <ul className="list-unstyled">
          <li>
            <p className={`sub-toggle ${subOpen.vpsInfo ? 'active' : ''}`}>
              <span onClick={() => handleNavigation('/vps/info')}>Thông tin VPS</span>
              <FaCaretDown
                className={`caret-icon ${subOpen.vpsInfo ? 'open' : ''}`}
                onClick={() => toggleSubOpen('vpsInfo')}
              />
            </p>
            <Collapse in={subOpen.vpsInfo}>
              <ul className="sub-list">
                <li
                  className={focusedItem === '/vps/package' ? 'focused' : ''} 
                  onClick={() => handleNavigation('/vps/package')}
                >
                  Gói VPS
                </li>
                <li
                  className={focusedItem === '/vps/features' ? 'focused' : ''} 
                  onClick={() => handleNavigation('/vps/features')}
                >
                  Tính năng VPS
                </li>
              </ul>
            </Collapse>
          </li>
        </ul>
      </Collapse>

      {/* Tiếp tục cho các phần khác như Server, SSL, Others, System... */}
    </div>
  );
};

export default Helpdesk;
