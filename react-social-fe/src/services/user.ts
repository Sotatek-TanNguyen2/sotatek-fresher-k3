import { axiosInstance } from './axios';

export const updateProfile = async (data: any) => {
  return await axiosInstance.put('/users', data);
};

export const changePassword = async (data: any) => {
  return await axiosInstance.post('/users', data);
};
