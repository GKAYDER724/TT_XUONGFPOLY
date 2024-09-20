import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TicketPage from './pages/TicketPage';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <TicketPage />
      </main>
      <Footer />
      <ChatBox />
    </div>
  );
}

export default App;
