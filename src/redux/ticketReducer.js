// ticketReducer.js
const initialState = {
  tickets: [], // Khởi tạo tickets dưới dạng mảng rỗng để tránh lỗi undefined
  error: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_SUCCESS':
      return { ...state, tickets: action.payload };
    case 'FETCH_TICKETS_FAILURE':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default ticketReducer;
