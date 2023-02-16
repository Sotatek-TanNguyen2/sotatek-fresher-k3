import { axiosInstance } from './axios';

export const updateProfile = (data: any) => axiosInstance.put('/users', data);

export const changeAvatar = (data: any) =>
  axiosInstance.put('/users/avatar', data);

export const changePassword = (data: any) => axiosInstance.post('/users', data);

export const getUserInfo = (userId: number) =>
  axiosInstance.get(`/users/${userId}`);
