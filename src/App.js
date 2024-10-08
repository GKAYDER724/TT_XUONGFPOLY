import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TicketPage from './pages/TicketPage';
import TicketList from './pages/TicketLists';
import ContributorsPage from './pages/ContributorsPage';
import ChatBox from './components/ChatBox';
import TicketLists from './pages/TicketLists';


function App() {
  return (
    <Router>
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>

          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/ticketlist" element={<TicketLists />} />
          <Route path="/contributors" element={<ContributorsPage />} />
        </Routes>
  
        <Footer />

      <ChatBox />
    </div>
    </Router>
  );
}

export default App;

