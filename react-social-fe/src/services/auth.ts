import { AxiosResponse } from 'axios';
import { axiosInstance } from './axios';

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const result = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  localStorage.setItem('accessToken', result.data.data.accessToken);
  return result;
};

export const getMe = (): Promise<AxiosResponse> => {
  return axiosInstance.get('/auth/me');
};

export const checkLogin = (): boolean => {
  return localStorage.getItem('accessToken') != null;
};
