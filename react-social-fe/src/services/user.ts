import { API } from './axios';

export const updateProfileAPI = (data: any) => API.put('users', data);

export const changeAvatarAPI = (data: any) => API.put('users/avatar', data);

export const changePasswordAPI = (data: any) => API.post('users', data);

export const getUserInfoAPI = (id: number) => API.get(`users/${id}`);
