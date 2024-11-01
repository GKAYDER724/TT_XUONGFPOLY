import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: JSON.parse(localStorage.getItem("authUser")) || null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },

  reducers: {

    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;





      //  Lưu thông tin người dùng và token vào localStorage
       localStorage.setItem('authToken', action.payload.token);
       localStorage.setItem('authUser', JSON.stringify(action.payload));





    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logout: (state) => {
      state.login.currentUser = null;
      state.login.isFetching = false;
      state.login.error = false;



        // Xóa thông tin khỏi localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');




    },
    setCurrentUser: (state, action) => {
      state.login.currentUser = action.payload;
    },
  },
});

// Export the action creators
export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logout,
  setCurrentUser,
} = authSlice.actions;


export default authSlice.reducer;
