import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  email: string;
  username?: string;
  name?: string;
  bio?: string;
  location?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export const { startLoading, endLoading, login, logout } = authSlice.actions;

export default authSlice.reducer;
