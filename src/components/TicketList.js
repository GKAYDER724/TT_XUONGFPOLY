import React, { useEffect, useState } from "react";  
import { useNavigate } from "react-router-dom";  
import { useSelector } from "react-redux";  
import ReactPaginate from "react-paginate";  
import { fetchTicketsByUser } from "../actions/ticketActions"; // Ensure this action is actually being used somewhere if needed.  
import "../css/TicketList.css";  

const TicketList = () => {  
  const user = useSelector((state) => state.auth.login.currentUser);  
  const [tickets, setTickets] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  
  const navigate = useNavigate();  
  const [currentPage, setCurrentPage] = useState(0);  
  const ticketsPerPage = 5;  

  // Pagination logic  
  const offset = currentPage * ticketsPerPage;  
  const currentTickets = tickets.slice(offset, offset + ticketsPerPage);  
  const pageCount = Math.ceil(tickets.length / ticketsPerPage);  

  const handlePageClick = (data) => {  
    setCurrentPage(data.selected);  
  };  

  useEffect(() => {  
    const fetchTickets = async () => {  
      try {  
        const response = await fetch("http://127.0.0.1:8000/api/users/13/support-tickets", {  
          method: "GET",  
          headers: {  
            "Content-Type": "application/json",  
          },  
        });  

        if (!response.ok) {  
          throw new Error("Mạng lỗi!");  
        }  

        const data = await response.json();  

        if (data.status) {  
          setTickets(data.tickets);  
        } else {  
          setError("Không thể lấy danh sách ticket");  
        }  
      } catch (err) {  
        setError("Có lỗi xảy ra: " + err.message);  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchTickets();  
  }, []);  

  if (loading) {  
    return <div>Đang tải dữ liệu...</div>;  
  }  

  if (error) {  
    return <div>{error}</div>;  
  }  

  const isImageFile = (fileName) => {  
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];  
    return imageExtensions.some((extension) => fileName.toLowerCase().endsWith(extension));  
  };  

  return (  
    <div className="ticket-system">  
      <TicketInfo user={user} navigate={navigate} />  
      <TicketListView tickets={currentTickets} user={user} pageCount={pageCount}  
        handlePageClick={handlePageClick}/>   
    </div>  
  );  
};  

const TicketInfo = ({ user, navigate }) => (  
  <div className="ticket-info">  
    <div className="ticket-header">  
      <h3>Thông tin Ticket</h3>  
    </div>  
    <div className="ticket-details">  
      {user?.name && (  
        <div>  
          <label>Requestor</label>  
          <div>  
            {user.name}  
            <span className="owner-badge">Owner</span>  
          </div>  
        </div>  
      )}  
      <Detail label="Phòng ban" value="Phòng kỹ thuật" />  
      <Detail label="Đã gửi" value="14/10/2021 (07:34)" />  
      <Detail label="Lần cập nhật cuối" value="2 năm trước" />  
      <Detail  
        label="Tình trạng/Mức độ ưu tiên"  
        value={  
          <div>  
            <span className="status-closed">Đã đóng</span>  
            <span className="priority-high">Cao</span>  
          </div>  
        }  
      />  
    </div>  
    <div className="ticket-actions">  
      <button className="reply-button" onClick={() => navigate("/ticket")}>Trả lời</button>  
      <button className="close-button" onClick={() => navigate("/ticketmess")}>Đã đóng</button>  
    </div>  
  </div>  
);  

const Detail = ({ label, value}) => (  
  <div>  
    <label>{label}</label>  
    <div>{value}</div>  
  </div>  
);

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

const TicketListView = ({ tickets, user , pageCount, handlePageClick }) => (  
  <div className="ticket-all">  
    {tickets.map((ticket) => (  
      <Ticket key={ticket.id} ticket={ticket} user={user} />  
    ))} 
    <ReactPaginate  
        previousLabel={<PrevIcon />}  
        nextLabel={<NextIcon />}  
        breakLabel={"..."}  
        breakClassName={"break-me"}  
        pageCount={pageCount}  
        marginPagesDisplayed={2}  
        pageRangeDisplayed={5}  
        onPageChange={handlePageClick}  
        containerClassName={"pagination"}  
        subContainerClassName={"pages pagination"}  
        activeClassName={"active"}  
    />  
  </div>

);  

const Ticket = ({ ticket, user }) => (  
  <div className="ticket">  
    <div className="ticket-header">  
      <div className="reply-author">  
        <div style={{ display: 'flex', alignItems: 'center' }}>  
          {/* User Icon */}  
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">  
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>  
          </svg>  
          {user?.name && <div>{user.name}</div>}  
        </div>  
        <span className="owner-badge">Owner</span>  
      </div>  
      <span className="reply-date">{new Date(ticket.created_at).toLocaleString()}</span>  
    </div>  
    <hr />  
    <div className="ticket-title">{ticket.title}</div>  
    <hr />  
    <AttachmentList files={ticket.files} />  
  </div>  
);  

const AttachmentList = ({ files }) => (  
  <div className="attachments">  
    {files && files.length > 0 && (  
      <div>  
        <span>Đính kèm:</span>  
        {files.map((file) => (  
          <a key={file.id} href={file.file_path} target="_blank" rel="noopener noreferrer" download>  
            {file.file_name}  
          </a>  
        ))}  
      </div>  
    )}  
  </div>  
);  

// const Pagination = ({ pageCount, handlePageClick }) => (  
  
// );  

export default TicketList;