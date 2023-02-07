import { axiosInstance } from './axios';

export const getAllPublicPostAPI = () => axiosInstance.get('posts');

export const getPostByIdAPI = (id: number) => axiosInstance.get(`posts/${id}`);

export const createPostAPI = (data: any) => axiosInstance.post('posts', data);

export const likePostAPI = (id: number) =>
  axiosInstance.post(`posts/${id}/like`);

export const deletePostAPI = (id: number) =>
  axiosInstance.delete(`posts/${id}`);
