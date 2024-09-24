import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Mặc định là tiếng Anh
  
    const toggleLanguage = () => {
      setLanguage((prevLang) => (prevLang === 'en' ? 'vi' : 'en'));
    };
  
    return (
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
};