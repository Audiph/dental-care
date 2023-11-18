import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
    modal: false,
    sideNav: false,
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

    showSideNav: (state) => {
      state.sideNav = true;
    },

    hideSideNav: (state) => {
      state.sideNav = false;
    },
  },
});

export const {
  showLoading,
  hideLoading,
  showModal,
  hideModal,
  showSideNav,
  hideSideNav,
} = alertsSlice.actions;
