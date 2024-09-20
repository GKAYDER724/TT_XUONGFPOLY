import React, { useState } from 'react';
import '../App.css';

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, type: 'user' }]);
      setMessage('');
      simulateAdminResponse();
    }
  };

  const simulateAdminResponse = () => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Thank you for your message. How can I assist you further?', type: 'admin' },
      ]);
    }, 1000); // Thay đổi thời gian phản hồi ở đây nếu cần
  };

  return (
    <div className={`chat-box ${isOpen ? 'open' : 'closed'}`}>
      <button className="chat-toggle-btn" onClick={toggleChat}>
        {isOpen ? 'Đóng Chat' : 'Chat ngay'}
      </button>
      {isOpen && (
        <div className="chat-content">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
