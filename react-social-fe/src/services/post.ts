import { FormValue } from '../components/PostList/Post';
import { Comment } from '../redux/slices/postSlide';
import { axiosInstance } from './axios';

export const getAllPublicPostAPI = (page: number = 1) =>
  axiosInstance.get(`posts?page=${page}`);

export const getPostByIdAPI = (id: number) => axiosInstance.get(`posts/${id}`);

export const createPostAPI = (data: any) => axiosInstance.post('posts', data);

export const editPostAPI = (id: number, data: any) =>
  axiosInstance.put(`posts/${id}`, data);

export const likePostAPI = (id: number) =>
  axiosInstance.post(`posts/${id}/like`);

export const deletePostAPI = (id: number) =>
  axiosInstance.delete(`posts/${id}`);

export const commentPostAPI = (postId: number, data: FormValue) =>
  axiosInstance.post<{ data: Comment }>(`comment/${postId}`, data);

export const editCommentAPI = (id: number, data: FormValue) =>
  axiosInstance.put<{ data: Comment }>(`comment/${id}`, data);

export const deleteCommentAPI = (id: number) =>
  axiosInstance.delete(`comment/${id}`);
