import React, { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import TicketPage from './pages/TicketPage';
import ChatBox from './components/ChatBox';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ticket" element={<TicketPage />} />
          </Routes>
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    </Router>
  );
}

export default App;
