import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users/13/support-tickets'; // Đường dẫn API của bạn

export const getTicketsByUser = async (id_user) => {
  try {
    // Đảm bảo sử dụng cú pháp chuỗi template với dấu nháy ngược
    const response = await axios.get(`http://127.0.0.1:8000/api/users/13/support-tickets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};
