import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/Auth/authSlide';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
