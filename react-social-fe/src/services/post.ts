import { axiosInstance } from './axios';

export const getAllPublicPostAPI = (page: number = 1) =>
  axiosInstance.get(`posts?page=${page}`);

export const getPostByIdAPI = (id: number) => axiosInstance.get(`posts/${id}`);

export const getPostOfUserAPI = (
  userId: number | undefined,
  page: number = 1
) => axiosInstance.get(`posts/user?id=${userId}&page=${page}`);

export const createPostAPI = (data: any) => axiosInstance.post('posts', data);

export const editPostAPI = (id: number, data: any) =>
  axiosInstance.put(`posts/${id}`, data);

export const likePostAPI = (id: number) =>
  axiosInstance.post(`posts/${id}/like`);

export const deletePostAPI = (id: number) =>
  axiosInstance.delete(`posts/${id}`);
