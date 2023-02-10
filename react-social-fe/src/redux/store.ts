import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlide';
import postReducer from './slices/postSlide';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
