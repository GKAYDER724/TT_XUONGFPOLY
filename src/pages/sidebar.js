import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Helpdesk = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [open, setOpen] = useState({});
  const [focusedItem, setFocusedItem] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/Category")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log dữ liệu để kiểm tra cấu trúc
        // Đảm bảo rằng categories được thiết lập với children_recursive là một mảng
        setCategories(data.data.map(category => ({
          ...category,
          children_recursive: category.children_recursive || [] // Đảm bảo children_recursive luôn là một mảng
        })) || []);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu categories:", error));
  }, []);

  const toggleOpen = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleNavigation = (path) => {
    setFocusedItem(path); // Update the focused item
    navigate(path); // Navigate to the corresponding page
  };

  // Hàm đệ quy để render danh mục cha và con
  const renderCategoryTree = (category, level = 0) => (
    <div key={category.id} className="mb-2" style={{ paddingLeft: `${level * 7}px` }}>
      <p className={`toggle-section ${open[category.id] ? 'active' : ''}`}>
        <span onClick={() => handleNavigation(`/category/${category.id}`)}>
          {category.name}
        </span>
        {/* Kiểm tra xem children_recursive có phải là một mảng và có phần tử không */}
        {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 && (
          <FaCaretDown
            className={`caret-icon ${open[category.id] ? 'open' : ''}`}
            onClick={() => toggleOpen(category.id)}
          />
        )}
      </p>
      {/* Kiểm tra xem children_recursive có phải là một mảng và có phần tử không */}
      {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 && (
        <Collapse in={open[category.id]}>
          <ul className="list-unstyled">
            {category.children_recursive.map((subCategory) => (
              <li key={subCategory.id}>
                {renderCategoryTree(subCategory, level + 1)} {/* Đệ quy với level tăng dần */}
              </li>
            ))}
          </ul>
        </Collapse>
      )}
    </div>
  );  

  return (
    <div className="sidebar">
      {categories.map((category) => renderCategoryTree(category))}
    </div>
  );
};

export default Helpdesk;
