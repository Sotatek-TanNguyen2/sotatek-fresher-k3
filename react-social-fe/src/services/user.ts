import { axiosInstance } from './axios';

export const updateProfileAPI = (data: any) =>
  axiosInstance.put('/users', data);

export const changeAvatarAPI = (data: any) =>
  axiosInstance.put('/users/avatar', data);

export const changePasswordAPI = (data: any) =>
  axiosInstance.post('/users', data);

export const getUserFriendAPI = (id: number) =>
  axiosInstance.post(`/users/friend/${id}`);

export const getUserInfoAPI = (id: number) => axiosInstance.get(`/users/${id}`);

export const requestFriendAPI = (id: number) => axiosInstance.post(`/`);
