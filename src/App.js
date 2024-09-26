import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TicketPage from './pages/TicketPage';
import ContributorsPage from './pages/ContributorsPage';
import ChatBox from './components/ChatBox';


function App() {
  return (
    <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>

          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/contributors" element={<ContributorsPage />} />
        </Routes>
  
        <Footer />

      <ChatBox />
    </div>
    </Router>
  );
}

export default App;

