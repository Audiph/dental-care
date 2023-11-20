import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { hideLoading, showLoading } from './alertsSlice';

export const getAllDentists = createAsyncThunk(
  'dentist/getAllDentists',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const res = await axios
        .get(`${BASE_URL}/api/admin/get-all-dentists`, {
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
      return res.data.dentists;
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const dentistSlice = createSlice({
  name: 'dentist',
  initialState: {
    dentists: [],
  },
  reducers: {
    setDentists: (state, action) => {
      state.dentists = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllDentists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dentists = action.payload;
    });
  },
});

export const { setDentists } = dentistSlice.actions;
