import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TicketPage from './pages/TicketPage';
import ChatBox from './components/ChatBox';
import Login from './pages/login';
import Register from './pages/register';
import Hosting from './pages/Hosting';
import Domain from './pages/domain';
import Quickguide from './pages/quickguide';
import Transfer from './pages/transfer';
import Quick1 from './pages/baiviet/quick1';
import Quick2 from './pages/baiviet/quick2';
import Quick3 from './pages/baiviet/quick3';
import Transfer1 from './pages/baiviet/transfer1';
import Transfer2 from './pages/baiviet/transfer2';
import "./assets/style.css";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<TicketPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/domain" element={<Domain />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/quickguide" element={<Quickguide />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/quick1" element={<Quick1 />} />
            <Route path="/quick2" element={<Quick2 />} />
            <Route path="/quick3" element={<Quick3 />} />
            <Route path="/transfer1" element={<Transfer1 />} />
            <Route path="/transfer2" element={<Transfer2 />} />
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
