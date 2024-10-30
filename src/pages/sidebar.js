import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { FaCaretDown } from 'react-icons/fa';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Helpdesk = () => {
  const [open, setOpen] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/Category")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(
          data.data.map(category => ({
            ...category,
            children_recursive: category.children_recursive || [] 
          })) || []
        );
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu categories:", error));
  }, []);

  const toggleOpen = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleCategoryClick = (category) => {
    if (category.children_recursive.length === 0) {
      navigate(`/Post/${category.id}`);
    } else {
      toggleOpen(category.id);
    }
  };

  const renderCategoryTree = (category, level = 0) => (
    <div key={category.id} className="mb-2" style={{ paddingLeft: `${level * 7}px` }}>
      <p 
        className={`toggle-section ${open[category.id] ? 'active' : ''}`} 
        onClick={() => handleCategoryClick(category)}
        style={{ cursor: 'pointer' }}
      >
        {/* Kiểm tra nếu có parent_id khác null */}
        {category.parent_id !== null ? (
          <Link to={`/AnswerSheet/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {category.name}
          </Link>
        ) : (
          <Link to={`/Question/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {category.name}
          </Link>
        )}
        {/* Hiển thị icon nếu có mục con */}
        {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 && (
          <FaCaretDown className={`caret-icon ${open[category.id] ? 'open' : ''}`} />
        )}
      </p>
      {/* Kiểm tra nếu có children_recursive */}
      {Array.isArray(category.children_recursive) && category.children_recursive.length > 0 && (
        <Collapse in={open[category.id]}>
          <ul className="list-unstyled">
            {category.children_recursive.map((subCategory) => (
              <li key={subCategory.id}>
                {renderCategoryTree(subCategory, level + 1)}
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