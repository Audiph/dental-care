import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { hideLoading, showLoading } from './alertsSlice';

export const getAllAppointmentsByUser = createAsyncThunk(
  'appointment/getAllAppointmentsByUser',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const res = await axios
        .get(`${BASE_URL}/api/user/get-appointments-by-user-id`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        thunkAPI.dispatch(hideLoading());
        return;
      }
      thunkAPI.dispatch(hideLoading());
      return res.data.appointments;
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getAllAppointmentRequests = createAsyncThunk(
  'appointment/getAllAppointmentRequests',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const res = await axios
        .get(`${BASE_URL}/api/dentist/get-appointments-by-dentist-id`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        thunkAPI.dispatch(hideLoading());
        return;
      }
      thunkAPI.dispatch(hideLoading());
      return res.data.appointments;
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getDentistDataById = createAsyncThunk(
  'appointment/getDentistDataById',
  async (appointmentId, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const res = await axios
        .post(
          `${BASE_URL}/api/user/get-appointment-info-by-id`,
          {
            appointmentId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => res)
        .catch((err) => err.response);

      if (!res.data.success) {
        thunkAPI.dispatch(hideLoading());
        thunkAPI.dispatch(hideAppointmentModal());
        dispatch;
        return;
      }
      thunkAPI.dispatch(hideLoading());
      return res.data.appointment;
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointment: null,
    appointments: [],
    appointmentModal: false,
  },

  reducers: {
    showAppointmentModal: (state) => {
      state.appointmentModal = true;
    },

    hideAppointmentModal: (state) => {
      state.appointmentModal = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllAppointmentsByUser.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });

    builder.addCase(getAllAppointmentRequests.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });

    builder.addCase(getDentistDataById.fulfilled, (state, action) => {
      state.appointment = action.payload;
    });
  },
});

export const { showAppointmentModal, hideAppointmentModal } =
  appointmentSlice.actions;
