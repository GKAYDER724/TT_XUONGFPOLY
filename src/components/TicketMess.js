import React, { useState, useEffect } from 'react';  
import { useNavigate } from "react-router-dom";  
// import '../css/TicketSystem.css';  
import '../css/TicketMess.css';  
import axios from 'axios';
import ReactPaginate from "react-paginate";  
import { useSelector } from "react-redux";

const PrevIcon = () => (  
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
  </svg>  
);

const NextIcon = () => (  
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
  </svg>  
);

const TicketMess = ({ support_ticket }) => {  
  const user = useSelector((state) => state.auth.login.currentUser);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);  
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);  
  const [ticketData, setTicketData] = useState(null);
  
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return; // Dừng không gọi API nếu chưa đăng nhập
    }
  const fetchData = async () => {
    try {
      const ticketCheckResponse = await axios.get(`http://127.0.0.1:8000/api/users/${user.id}/support-tickets`);
      console.log(ticketCheckResponse.data.tickets);
      
      if (Array.isArray(ticketCheckResponse.data.tickets)) {
        for (const tickets of ticketCheckResponse.data.tickets) {
          console.log(tickets.id);
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/support-tickets/${tickets.id}/replies`);
            setTicketData(prevData => ({
              ...prevData,
              [tickets.id]: {
                ...tickets,
                "Phiếu trả lời": response.data, // Cập nhật replies cho ticket này
              }
            }));
            console.log(response.data); // Log the replies data if needed
          } catch (error) {
            console.error(`Failed to fetch replies for ticket ID ${tickets.id}:`, error);
          }
        }
      } else {
        console.log("`tickets` is not an array or is undefined.");
      }
      
    } catch (error) {
      console.error(error); // Log the detailed error for better debugging
      setError('Lỗi khi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
  }, [user]); // Chạy lại effect mỗi khi user thay đổi  

  if (error) return <div className="error">{error}</div>;  
  if (!user) return (  
    <div className="no-access">  
      <h2>Vui lòng đăng nhập để xem các phiếu hỗ trợ.</h2>  
    </div>  
  );  

  return (  
    <div>  
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
            <button className="reply-button" onClick={() => navigate("/ticket")}>Trả lời</button>  
            <button className="close-button" >Đã đóng</button>
            <button className="list-button" onClick={() => navigate("/ticketlist")}>Xem danh sách Ticket đã gửi</button>  
          </div>
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
        <div className="tkm-ctn">
          <div className="notification">
            Ticket này đang ở trạng thái đóng. Quý khách có thể trả lời để mở lại Ticket này.
          </div>
          {ticketData ? (
            Object.keys(ticketData).map((tickets, index) => {
              const ticket = ticketData[tickets]["Phiếu trả lời"];
              
              return (
                <div key={index}>
                  {/* Hiển thị các replies */}
                  {ticket["Phiếu trả lời"] && Array.isArray(ticket["Phiếu trả lời"]) && ticket["Phiếu trả lời"].length > 0 ? (
                    <ul className="replies">
                      {ticket["Phiếu trả lời"].map((reply) => (
                        <div key={reply.id} className="reply">
                          <div className="reply-header">
                            <div className="reply-author">
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                {reply.assigned_to}
                              </div>
                              <span className="operator-badge">Operator</span>
                            </div>
                            <span className="reply-date">{new Date(reply.created_at).toLocaleString()}</span>
                          </div>
                          <hr />
                          <h4>{reply.title}</h4>
                          <p>{reply.content}</p>
                        </div>
                      ))}
                    </ul>
                  ) : null (
                    <p>Không có trả lời nào.</p>
                  )}

                  {/* Hiển thị "Phiếu Hỏi" */}
                  {ticket["Phiếu Hỏi"] && (
                    <div className="ticket">
                      <div className="reply-header">
                        <div className="reply-author">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            {user?.name && <div>{user.name}</div>}
                          </div>
                          <span className="owner-badge">Owner</span>
                        </div>
                        <span className="reply-date">{new Date(ticket["Phiếu Hỏi"].created_at).toLocaleString()}</span>
                      </div>
                      <hr />
                      <h2>{ticket["Phiếu Hỏi"].title}</h2>
                      <p>{ticket["Phiếu Hỏi"].content}</p>
                    </div>  
                  )}
                </div>
              );
            })
          ) : (
            <p>Không có dữ liệu ticket nào.</p>
          )}
        </div>
      </div> 
    </div>  
  );  
};  

export default TicketMess;