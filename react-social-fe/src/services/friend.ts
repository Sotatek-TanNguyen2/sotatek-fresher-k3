import { API } from './axios';

export const getUserFriendAPI = (id: number) => API.post(`friend/${id}`);

export const requestFriendAPI = (id: number) =>
  API.post(`friend/request/${id}`);

export const acceptFriendAPI = (id: number) => API.post(`friend/accept/${id}`);

export const rejectFriendAPI = (id: number) => API.post(`friend/reject/${id}`);

export const unfriendAPI = (id: number) => API.delete(`friend/${id}`);
