import { AxiosResponse } from 'axios';
import { API } from './axios';

export const getMeAPI = async (): Promise<AxiosResponse> => {
  return API.get('auth/me');
};

export const loginAPI = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const res = await API.post('auth/login', {
    email,
    password,
  });
  localStorage.setItem('accessToken', res.data.data.accessToken);
  localStorage.setItem('refreshToken', res.data.data.refreshToken);
  return res;
};

export const signupAPI = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<AxiosResponse> => {
  const res = await API.post('auth/signup', {
    email,
    password,
    confirmPassword,
  });
  localStorage.setItem('accessToken', res.data.data.accessToken);
  localStorage.setItem('refreshToken', res.data.data.refreshToken);
  return res;
};

export const checkLogin = (): boolean => {
  return localStorage.getItem('accessToken') != null;
};
