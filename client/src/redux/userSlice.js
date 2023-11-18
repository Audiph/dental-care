import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: true,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    toggleLogin: (state, action) => {
      state.login = action.payload;
    },

    showRegister: (state) => {
      state.login = false;
    },
  },
});

export const { setUser, toggleLogin, showRegister } = userSlice.actions;
