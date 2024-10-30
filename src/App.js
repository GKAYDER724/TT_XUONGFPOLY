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
import Question from './pages/Question';
import AnswerSheet from './pages/AnswerSheet';
import Post from './pages/Post'
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
            <Route path="/Question/:id" element={<Question />} /> {/* Thêm route cho chi tiết danh mục */}
            <Route path="/AnswerSheet/:id" element={<AnswerSheet />} /> {/* Thêm route cho chi tiết danh mục */}
            <Route path="/Post/:id" element={<Post />} /> {/* Thêm route cho chi tiết danh mục */}
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
