import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { alertsSlice } from './alertsSlice';
import { userSlice } from './userSlice';
import { dentistSlice } from './dentistSlice';
import { appointmentSlice } from './appointmentSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
  dentist: dentistSlice.reducer,
  appointment: appointmentSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
