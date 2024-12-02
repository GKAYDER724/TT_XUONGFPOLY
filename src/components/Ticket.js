import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TicketSystem.css'; // Assume you have CSS file for styling
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import { useSelector } from "react-redux";

const TicketSystem = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileInputs, setFileInputs] = useState([{ id: 0, file: null }]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    department: 'Phòng kỹ thuật',
    priority: 'Bình thường',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
        setError("Tiêu đề và nội dung không được để trống.");
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!user) {
        alert("Vui lòng đăng nhập trước khi gửi phiếu.");
        return;
    }

    try {
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('content', content.trim());
        formData.append('priority', 'medium');
        formData.append('status', 'open');
        formData.append('user_id', user.id); // Append user_id to the FormData

        console.log('Submitting ticket for user ID:', user.id);
        
        // Append files if any
        fileInputs.forEach(input => {
            if (input.file) {
                formData.append('files[]', input.file);
            }
        });

        // Send the POST request
        const response = await axios.post('http://127.0.0.1:8000/api/sp', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`
            },
        });

        // Handle the response
        if (response.data.status) {
            setSuccess(true);
            setTitle('');
            setContent('');
            setFileInputs([{ id: 0, file: null }]);
        } else {
            throw new Error(response.data.message || 'Không thể gửi ticket');
        }

    } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error('Lỗi khi gửi ticket:', err.response?.data);
    } finally {
        setLoading(false);
    }
};


  const handleFileChange = (index, file) => {
    const updatedInputs = fileInputs.map((input, i) =>
      i === index ? { ...input, file } : input
    );
    setFileInputs(updatedInputs);
  };

  const addFileInput = () => {
    setFileInputs([...fileInputs, { id: fileInputs.length, file: null }]);
  };

  const removeFileInput = (index) => {
    setFileInputs(fileInputs.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const countLinesAndWords = (text) => {
    const lines = text.split('\n').length;
    const words = text.split(/\s+/).filter((word) => word.length > 0).length;
    return { lines, words };
  };

  const { lines, words } = countLinesAndWords(content);

  const handlePreview = () => {
    // Logic to display a preview of the submitted content
    alert(`Title: ${title}\nContent: ${content}\nLines: ${lines}\nWords: ${words}`);
  };
  
  return (
    <>
    {!user ? (
      <div style={{ color: 'red', marginBottom: '10px' }}>
        Bạn cần đăng nhập để gửi ticket!
      </div>
    ) : (
      <div style={{ color: 'green', marginBottom: '10px' }}>
        Bạn đã có thể gửi ticket
      </div>
    )}
    <div className="ticket-system">
      {/* Ticket Information Section */}
      <div className="ticket-info">
        <div className="ticket-header">
          <h3>Thông tin Ticket</h3>
        </div>
        <div className="ticket-details">
          <div>
            <label>Requestor</label>
            {user?.name ? (
              <div>
                  {user.name}
                  <span className="owner-badge">Owner</span>
              </div>
          ) : null}
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
          <button className="reply-button">Trả lời</button>
          <button className="close-button" onClick={() => navigate("/ticketmess")}>Đã đóng</button>
          <button className="list-button" onClick={() => navigate("/ticketlist")}>Xem danh sách Ticket đã gửi</button> 
        </div>

        {/* CC Recipients Section */}
        <div className="cc-recipients">
          <label>CC Recipients</label>
          <input type="text" placeholder="Enter Email Address" />
          <button className='btn-mail'>Add</button>
        </div>

        {/* Support Links */}
        <div className="support-links">
          <h4>Hỗ trợ</h4>
          <ul>
            <li><a href="/ticketlist">Quản lý Ticket</a></li>
            <li><a href="#">Thông báo</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
            <li><a href="#">Tài nguyên</a></li>
            <li><a href="#">Tình trạng Server</a></li>
            <li><a href="#">Mở Ticket</a></li>
          </ul>
        </div>
      </div>

      <div className="reply-form">
        <div className="form-header">
          <h3>Trả lời</h3>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form-container">
            <div className="form-row">
            {user && (
              <>
                <div className="form-group">
                  <label>Họ & Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}  // Sử dụng {user.name} thay vì ${user.name}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}  // Sử dụng {user.gmail} thay vì ${user.gmail}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </>
            )}

            </div>
            <div className="form-row">
            <div className="form-group">
                <label>Phòng ban</label>
                <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                >
                <option value="Phòng kỹ thuật">Phòng kỹ thuật</option>
                <option value="Phòng hành chính">Phòng hành chính</option>
                <option value="Phòng tài chính">Phòng tài chính</option>
                </select>
            </div>
            <div className="form-group">
                <label>Mức độ ưu tiên</label>
                <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                >
                <option value="Bình thường">Bình thường</option>
                <option value="Cao">Cao</option>
                <option value="Thấp">Thấp</option>
                </select>
            </div>
            </div>
        </div>
          <div className="form-group">
            <div className="c-container">  
              <h4>Nội dung</h4>
              <h6></h6>
              <div>  
                <label>Tiêu đề</label>    
                <input  
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />  
              </div>  
              <div>  
              <h5>Nội dung</h5>  
                <div className="editor-toolbar">  
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16">
                      <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                    </svg>         
                  </button>  
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16">
                      <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-type-h3" viewBox="0 0 16 16">
                      <path d="M11.07 8.4h1.049c1.174 0 1.99.69 2.004 1.724s-.802 1.786-2.068 1.779c-1.11-.007-1.905-.605-1.99-1.357h-1.21C8.926 11.91 10.116 13 12.028 13c1.99 0 3.439-1.188 3.404-2.87-.028-1.553-1.287-2.221-2.096-2.313v-.07c.724-.127 1.814-.935 1.772-2.293-.035-1.392-1.21-2.468-3.038-2.454-1.927.007-2.94 1.196-2.981 2.426h1.23c.064-.71.732-1.336 1.744-1.336 1.027 0 1.744.64 1.744 1.568.007.95-.738 1.639-1.744 1.639h-.991V8.4ZM7.495 13V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13z"/>
                    </svg>
                  </button>
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                    </svg> 
                  </button>  
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    </svg>
                  </button>  
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                      <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
                    </svg>
                  </button>  
                  <button className="preview-button" onClick={handlePreview}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    Preview
                  </button>  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
                  </svg>  
                </div>  
                <textarea  
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required  
                />  
                <div className="status">  
                  lines: {lines} words: {words} saved  
                </div> 
              </div>  
            </div> 
          </div>
          <div className="form-group">
          <div className="file-input-container">
            {fileInputs.map((input, index) => (
                <div key={input.id} className="file-input-wrapper">
                    <label className="file-label">
                        Chọn tập tin
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(index, e.target.files[0])}
                            style={{ display: 'none' }}
                        />
                    </label>
                    <span className="file-name">
                        {input.file ? input.file.name : 'No file selected'}
                    </span>
                    <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeFileInput(index)}
                    >
                        Xóa
                    </button>
                    
                </div>
            ))}
            <button type="button" className="add-button" onClick={addFileInput}>
              + Thêm
            </button>
            <div className="file-info">
                Hỗ trợ định dạng: .jpg, .gif, .jpeg, .png, .pdf, .zip, .doc (Max file size: 1280MB)
            </div>
          </div>
          </div>
          <div className="form-actions">
            {user && (
            <button type="submit" disabled={loading}>
              {loading ? 'Đang gửi...' : 'Gửi Ticket'}
            </button>
            )}
            <button type="button">Hủy bỏ</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default TicketSystem;
