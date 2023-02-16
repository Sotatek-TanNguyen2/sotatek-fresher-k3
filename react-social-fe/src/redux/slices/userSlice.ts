import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authSlice';

export interface UserInfo extends User {
  friend: User[];
}

export interface UserState {
  user: UserInfo | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    getUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectLoading = (state: { user: UserState }) => state.user.loading;

export const { startLoading, endLoading, getUser } = userSlice.actions;

export default userSlice.reducer;
