import axios from "axios";
import { 
  loginFailed, 
  loginSuccess, 
  loginStart, 
  registerSuccess, 
  registerFailed, 
  registerStart, 
  logout
} from "./authSlide";
// import { getUsersStart, getUsersSuccess } from "./";

// Login User
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/login', user);
        localStorage.setItem('authToken', res.data.token);
        dispatch(loginSuccess(res.data.user));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
        return error.response.data;
    }
}

// Register User
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart()); 
    try {
        await axios.post('http://127.0.0.1:8000/api/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed());
        return error.response.data;
    }
}



// Logout User
export const logoutUser = async (dispatch, navigate) => {
    dispatch(logout()); 
    localStorage.removeItem('authToken');
    // localStorage.removeItem('authUser');
   
    navigate('/login'); 
} 