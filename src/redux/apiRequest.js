import axios from "axios";
import { 
  loginFailed, 
  loginSuccess, 
  loginStart, 
  registerSuccess, 
  registerFailed, 
  registerStart 
} from "./authSlide";

// Login User
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
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
    }
}
