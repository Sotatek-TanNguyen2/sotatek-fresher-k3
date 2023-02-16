import { Comment } from '../redux/slices/postSlice';
import { FormValue } from './../components/PostList/Post';
import { axiosInstance } from './axios';

export const commentPostAPI = (postId: number, data: FormValue) =>
  axiosInstance.post<{ data: Comment }>(`comment/${postId}`, data);

export const editCommentAPI = (id: number, data: FormValue) =>
  axiosInstance.put<{ data: Comment }>(`comment/${id}`, data);

export const deleteCommentAPI = (id: number) =>
  axiosInstance.delete(`comment/${id}`);
