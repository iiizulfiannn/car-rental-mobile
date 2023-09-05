import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    account: null,
    isAdmin: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
      state.isAdmin = action.payload.role === 1;
    },
    logout: (state, action) => {
      state.token = '';
      state.account = null;
    },
  },
});

export const { setToken, setAccount, logout } = authSlice.actions;

export default authSlice;
