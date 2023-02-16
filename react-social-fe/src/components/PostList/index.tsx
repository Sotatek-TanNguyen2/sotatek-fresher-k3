import { Stack } from '@mui/material';
import React from 'react';
import { Post } from '../../redux/slices/postSlice';
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
