import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { alertsSlice } from './alertsSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
