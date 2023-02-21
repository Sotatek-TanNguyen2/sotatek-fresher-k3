import { API } from './axios';

export const getAllPublicPostAPI = (page: number = 1) =>
  API.get(`posts?page=${page}`);

export const getPostByIdAPI = (id: number) => API.get(`posts/${id}`);

export const getPostOfUserAPI = (
  userId: number | undefined,
  page: number = 1
) => API.get(`posts/user/${userId}?page=${page}`);

export const createPostAPI = (data: any) => API.post('posts', data);

export const editPostAPI = (id: number, data: any) =>
  API.put(`posts/${id}`, data);

export const likePostAPI = (id: number) => API.post(`posts/${id}/like`);

export const deletePostAPI = (id: number) => API.delete(`posts/${id}`);
