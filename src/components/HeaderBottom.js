import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Header = () => { 
    return (
        <header>
            <div className="header">
                <div className="container">
                    <input type="text" placeholder="Nhập từ khóa tìm kiếm" className="search-input" />
                    <Button variant="warning" size="lg">
                        <FaSearch className="search-icon" />
                    </Button>{' '}
                </div>
            </div>
        </header> 
    );
};

export default Header;
