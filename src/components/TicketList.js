import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const navigate = useNavigate();

  // Lấy dữ liệu tickets từ API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:3000/tickets");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Dữ liệu trả về:", data); // Log dữ liệu trả về
        // Chỉnh sửa ở đây: Gán tickets trực tiếp từ dữ liệu trả về
        if (Array.isArray(data)) { // Kiểm tra xem dữ liệu trả về có phải là mảng không
          setTickets(data); // Gán dữ liệu vào tickets
        } else {
          setError("Dữ liệu không hợp lệ"); // Thiết lập lỗi nếu không phải là mảng
        }
      } catch (error) {
        console.error("Lỗi khi lấy tickets:", error);
        setError(error.message); // Thiết lập thông báo lỗi
      } finally {
        setLoading(false); // Đặt loading thành false khi xong
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị thông báo loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Hiển thị thông báo lỗi
  }

  return (
    <div className="card card-body">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Danh sách Ticket đã gửi</h3>
        <button className="btn btn-primary" onClick={() => navigate("/ticket")}>
          Quay về ticket
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>Địa chỉ Email</th>
            <th>Nội dung</th>
            <th>Đính kèm</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.content1}</td> {/* Chỉnh sửa ở đây để sử dụng content1 */}
                <td>{ticket.file}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
