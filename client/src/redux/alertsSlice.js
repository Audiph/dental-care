import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
    modal: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },

    hideLoading: (state) => {
      state.loading = false;
    },

    showModal: (state) => {
      state.modal = true;
    },

    hideModal: (state) => {
      state.modal = false;
    },
  },
});

export const { showLoading, hideLoading, showModal, hideModal } =
  alertsSlice.actions;
