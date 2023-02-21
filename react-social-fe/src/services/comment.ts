import { AxiosResponse } from 'axios';
import { Comment } from '../redux/slices/postSlice';
import { FormValue } from './../components/PostList/Post';
import { API } from './axios';

export const commentPostAPI = (
  postId: number,
  data: FormValue
): Promise<AxiosResponse<{ data: Comment }>> =>
  API.post(`comment/${postId}`, data);

export const editCommentAPI = (
  id: number,
  data: FormValue
): Promise<AxiosResponse<{ data: Comment }>> => API.put(`comment/${id}`, data);

export const deleteCommentAPI = (id: number) => API.delete(`comment/${id}`);
