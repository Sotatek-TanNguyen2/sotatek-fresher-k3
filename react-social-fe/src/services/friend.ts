import { axiosInstance } from './axios';

export const getUserFriendAPI = (id: number) =>
  axiosInstance.post(`friend/${id}`);

export const requestFriendAPI = (id: number) =>
  axiosInstance.post(`friend/request/${id}`);

export const acceptFriendAPI = (id: number) =>
  axiosInstance.post(`friend/accept/${id}`);

export const rejectFriendAPI = (id: number) =>
  axiosInstance.post(`friend/reject/${id}`);
