import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authSlice';

export interface Friend {
  id: number;
  friendStatus: string;
  userReceive: User | null;
  userRequest: User | null;
}

export interface UserState {
  friends: Friend[];
  followings: Friend[];
  followers: Friend[];
  loading: boolean;
}

const initialState: UserState = {
  friends: [],
  followings: [],
  followers: [],
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
    getFriends: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
    },
    getFollowings: (state, action: PayloadAction<Friend[]>) => {
      state.followings = action.payload;
    },
    getFollowers: (state, action: PayloadAction<Friend[]>) => {
      state.followers = action.payload;
    },
  },
});

export const selectLoading = (state: { user: UserState }) => state.user.loading;
export const selectFriends = (state: { user: UserState }) => state.user.friends;
export const selectFollowings = (state: { user: UserState }) =>
  state.user.followings;
export const selectFollowers = (state: { user: UserState }) =>
  state.user.followers;

export const {
  startLoading,
  endLoading,
  getFriends,
  getFollowings,
  getFollowers,
} = userSlice.actions;

export default userSlice.reducer;
