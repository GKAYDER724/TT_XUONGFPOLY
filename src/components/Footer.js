import React, { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    en: {
      copyright: '© 2024 My Website',
    },
    vi: {
      copyright: '© 2024 Trang web của tôi',
    },
  };

  const handleLanguageChange = (lang) => {
    if (language !== lang) {
      toggleLanguage();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    // Add your search logic here
  };

  return (
    <footer className="bg-light text-dark py-1 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>{content[language].copyright}</p>
          </div>
          <div className="col-md-6 text-right">
            <div className="dropup">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="languageDropup"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {language === 'en' ? 'English' : 'Tiếng Việt'}
              </button>
              <ul className="dropdown-menu" aria-labelledby="languageDropup">
                {/* Search bar inside dropdown */}
                <li>
                  <form onSubmit={handleSearchSubmit} className="px-3 py-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={language === 'en' ? 'Search...' : 'Tìm kiếm...'}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <button type="submit" className="btn btn-primary mt-2">
                      {language === 'en' ? 'Search' : 'Tìm kiếm'}
                    </button>
                  </form>
                </li>
                <li><hr className="dropdown-divider" /></li>
                {/* Language selection */}
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange('vi')}
                  >
                    Tiếng Việt
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
