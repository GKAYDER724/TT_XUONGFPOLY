import { getTicketsByUser } from '../services/fetchTicketsApi';

export const fetchTicketsByUser = (user_id) => async (dispatch) => {
  try {
    const tickets = await getTicketsByUser(user_id);
    dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: tickets });
  } catch (error) {
    dispatch({ type: 'FETCH_TICKETS_FAILURE', error });
  }
};