import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  endLoading,
  getAll,
  selectPosts,
  startLoading,
} from '../../redux/slices/postSlide';
import { getAllPublicPostAPI } from '../../services/post';
import PostItem from './Post';

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const loadAllPublicPost = async () => {
    dispatch(startLoading());
    try {
      const res = await getAllPublicPostAPI();
      dispatch(getAll(res.data.data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllPublicPost();
  }, []);

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostList;
