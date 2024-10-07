import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import Blog from './pages/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login';
import Register from './pages/register';
import Hosting from './pages/Hosting';
import Domain from './pages/domain';
import Quickguide from './pages/quickguide';
import Transfer from './pages/transfer';
import Quick1 from './pages/quick1';
import Quick2 from './pages/quick2';
import Quick3 from './pages/quick3';
import Transfer1 from './pages/transfer1';
import Transfer2 from './pages/transfer2';
import TicketPage from './pages/TicketPage';
import ServiceDetail from './components/ServiceDetail';
import ChatBox from './components/ChatBox';
import "./assets/style.css";
function App() {
  return (
    <Router>
      <Header />
        <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/service/:category/:serviceName" element={<ServiceDetail />} />
            <Route path="/ticket" element={<TicketPage />} />
          </Routes>
        <Footer />
    </Router>
  );
}

export default App;
