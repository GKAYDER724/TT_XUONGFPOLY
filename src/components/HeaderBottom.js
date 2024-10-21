import React from "react";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="header bg-light py-3">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Tìm kiếm..."
              style={{ width: "200px" }}
            />
            <Button variant="primary">
              <FaSearch /> Tìm kiếm
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
