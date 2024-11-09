import React, { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom";  
import '../css/TicketSystem.css';  
import '../css/TicketMess.css';  
import axios from 'axios';  
import { useDispatch, useSelector } from "react-redux";  
import { loginSuccess } from '../redux/authSlide'; // Giả sử bạn có slide Redux cho việc đăng nhập  

const TicketMess = () => {  
  const user = useSelector((state) => state.auth.login.currentUser);  
  const [loading, setLoading] = useState(true); // Đặt true ở đầu để khởi động  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();  
  const [ticketData, setTicketData] = useState(null);    

  useEffect(() => {  
    const fetchData = async () => {  
        try {  
            const response = await axios.get('http://127.0.0.1:8000/api/support-tickets/738/replies');  
            setTicketData(response.data);  
        } catch (error) {  
            setError('Lỗi khi lấy dữ liệu');  
        } finally {  
            setLoading(false);  
        }  
    };  

    if (user) { // Kiểm tra xem người dùng đã đăng nhập hay chưa  
      fetchData();  
    } else {  
      setLoading(false); // Nếu chưa đăng nhập, không chờ dữ liệu  
    }  
  }, [user]); // Chạy lại effect mỗi khi user thay đổi  

  if (loading) return <div className="loading">Đang tải...</div>;  
  if (error) return <div className="error">{error}</div>;  
  if (!user) return (  
    <div className="no-access">  
      <h2>Vui lòng đăng nhập để xem các phiếu hỗ trợ.</h2>  
    </div>  
  );  

  if (!ticketData) return <div className="no-data">Không có dữ liệu</div>;  

  return (  
    <>  
      <div className="ticket-system">  
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
            <button className="reply-button" onClick={() => navigate("/ticket")}>  
              Trả lời  
            </button>  
            <button className="close-button" >Đã đóng</button>
            <button className="reply-button" onClick={() => navigate("/ticketlist")}>Xem danh sách Ticket đã gửi</button>  
          </div>  
        </div>  
        <div className="tkm-ctn">
          <div className="notification">  
            Ticket này đang ở trạng thái đóng. Quý khách có thể trả lời để mở lại Ticket này.  
          </div>  
          <ul className="replies">  
            {ticketData["Phiếu trả lời"].map(reply => ( 
              <div key={reply.id} className="reply">  
                <div className="reply-header">
                  <div className="reply-author">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                      </svg>{reply.assigned_to}  
                      
                    </div><span className="operator-badge">Operator</span> 
                  </div>  
                  <span className="reply-date">{new Date(reply.created_at).toLocaleString()}</span>  
                </div>  
                <hr></hr>
                <h4>{reply.title}</h4>
                <p>{reply.content}</p>
              </div>   
            ))}  
          </ul>
          <div className="ticket">
            <div className="reply-header">
                  <div className="reply-author">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                      </svg>{user?.name ? (  
                  <div>  
                    {user.name}  
                      
                  </div>  
                ) : null}   
                    </div><span className="owner-badge">Owner</span>  
                  </div>  
                  <span className="reply-date">{new Date(ticketData["Phiếu Hỏi"].created_at).toLocaleString()}</span>  
                </div>
            <hr></hr> 
            <h2>{ticketData["Phiếu Hỏi"].title}</h2>  
            <p>{ticketData["Phiếu Hỏi"].content}</p>  
          </div>     
        </div>  
      </div>  
    </>  
  );  
};  

export default TicketMess;