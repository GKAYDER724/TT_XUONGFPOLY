import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketsByUser } from '../actions/ticketActions';
import '../css/TicketList.css'; 

const TicketList = () => {
  const [tickets, setTickets] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const navigate = useNavigate();    

    useEffect(() => {  
        const fetchTickets = async () => {  
            try {  
                const response = await fetch('http://127.0.0.1:8000/api/users/13/support-tickets', {  
                    method: 'GET',  
                    headers: {  
                        'Content-Type': 'application/json',  
                    },  
                });  

                if (!response.ok) {  
                    throw new Error('Mạng lỗi!');  
                }  

                const data = await response.json();  

                if (data.status) {  
                    setTickets(data.tickets);  
                } else {  
                    setError('Không thể lấy danh sách ticket');  
                }  
            } catch (err) {  
                setError('Có lỗi xảy ra: ' + err.message);  
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
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];  
      return imageExtensions.some(extension => fileName.toLowerCase().endsWith(extension));  
    };
    return (  
        <div> 
          <button className="btn-view-tickets" onClick={() => navigate("/ticket")}>Quay về</button>  
          <h2>Danh sách Ticket mới gửi</h2>  
            <table>  
                <thead>  
                    <tr>  
                        <th>Ticket ID</th>  
                        <th>Tiêu đề</th>  
                        <th>Nội dung</th>  
                        <th>Độ ưu tiên</th>  
                        <th>Trạng thái</th>
                        <th>Files</th>   
                    </tr>  
                </thead>  
                <tbody>  
                    {tickets.map(ticket => (  
                        <tr key={ticket.id}>  
                            <td>{ticket.id}</td>  
                            <td>{ticket.title}</td>  
                            <td>{ticket.content}</td>  
                            <td>{ticket.priority}</td>  
                            <td>{ticket.status}</td> 
                            <td>  
                                <ul>  
                                    {ticket.files.map(file => (  
                                        <li key={file.id}>  
                                            {isImageFile(file.file_name) && (  
                                                <img  
                                                    src={file.file_path}  
                                                    alt={file.file_name}  
                                                    style={{ width: '100px', height: 'auto', marginTop: '5px' }} // Kích thước hình ảnh  
                                                />  
                                            )}  
                                        </li>  
                                    ))}  
                                </ul>  
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
  );  
};

export default TicketList;
