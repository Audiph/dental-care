import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { hideLoading, showLoading } from './alertsSlice';

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const res = await axios
        .get(`${BASE_URL}/api/admin/get-all-users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        dispatch(hideLoading());
        return;
      }
      thunkAPI.dispatch(hideLoading());
      return res.data.users;
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    login: true,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    toggleLogin: (state, action) => {
      state.login = action.payload;
    },

    showRegister: (state) => {
      state.login = false;
    },

    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
  },
});

export const { setUser, setUsers, toggleLogin, showRegister, logout } =
  userSlice.actions;
