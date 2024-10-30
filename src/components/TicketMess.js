import React, { useState } from 'react';
import '../css/TicketSystem.css'; // Assume you have CSS file for styling

const TicketMess = () => {
  const [formData, setFormData] = useState({
      name: 'Kayer Tyk',
      email: 'gkaydertk@gmail.com',
      department: 'Phòng kỹ thuật',
      priority: 'Bình thường'
  });
  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const [title, setTitle] = useState('');  
  
  const [content, setContent] = useState('');  

  const handlePreview = () => {  
    alert('Preview: ' + content);  
  };  

  const countLinesAndWords = (text) => {  
    const lines = text.split('\n').length;  
    const words = text.split(/\s+/).filter(word => word.length > 0).length;  
    return { lines, words };  
  };  

  const { lines, words } = countLinesAndWords(content);


  return (
    <div className="ticket-system">
      {/* Ticket Information Section */}
      <div className="ticket-info">
        <div className="ticket-header">
          <h3>Thông tin Ticket</h3>
        </div>
        <div className="ticket-details">
          <div>
            <label>Requestor</label>
            <div>KAYER TYK <span className="owner-badge">Owner</span></div>
          </div>
          <div>
            <label>Phòng ban</label>
            <div>Phòng kỹ thuật</div>
          </div>
          <div>
            <label>Đã gửi</label>
            <div>14/10/2021 (07:34)</div>
          </div>
          <div>
            <label>Lần cập nhật cuối</label>
            <div>2 năm trước</div>
          </div>
          <div>
            <label>Tình trạng/Mức độ ưu tiên</label>
            <div>
              <span className="status-closed">Đã đóng</span>
              <span className="priority-high">Cao</span>
            </div>
          </div>
        </div>
        <div className="ticket-actions">
            <button className="reply-button">
              Trả lời
            </button>
          <button className="close-button">Đã đóng</button>
        </div>

        {/* CC Recipients Section */}
        <div className="cc-recipients">
          <label>CC Recipients</label>
          <input type="text" placeholder="Enter Email Address" />
          <button>Add</button>
        </div>

        {/* Support Links */}
        <div className="support-links">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="#">Quản lý Ticket</a></li>
            <li><a href="#">Thông báo</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
            <li><a href="#">Tài nguyên</a></li>
            <li><a href="#">Tình trạng Server</a></li>
            <li><a href="#">Mở Ticket</a></li>
          </ul>
        </div>
      </div>
    </div> 
  );
};

export default TicketMess;
