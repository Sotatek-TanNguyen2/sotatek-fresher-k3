import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  endLoading,
  getAll,
  Post,
  selectPosts,
  startLoading,
} from '../../redux/slices/postSlide';
import { getAllPublicPostAPI } from '../../services/post';
import PostItem from './Post';

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostList;
