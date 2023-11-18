import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    login: true,
  },
  reducers: {
    toggleLogin: (state, action) => {
      state.login = action.payload;
    },

    showRegister: (state) => {
      state.login = false;
    },
  },
});

export const { toggleLogin, showRegister } = userSlice.actions;
