import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  endLoading,
  loadMore,
  Post,
  selectPage,
  selectTotalPage,
  startLoading,
} from '../../redux/slices/postSlice';
import { getAllPublicPostAPI } from '../../services/post';
import PostItem from './Post';

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  const page = useSelector(selectPage);
  const totalPage = useSelector(selectTotalPage);
  const dispatch = useDispatch();

  const loadMorePost = async () => {
    dispatch(startLoading());
    try {
      const { data } = await getAllPublicPostAPI(page + 1);
      dispatch(
        loadMore({
          page: page + 1,
          totalPage: data?.metadata?.totalPage,
          posts: data.data,
        })
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      {totalPage && page !== totalPage ? (
        <Box sx={{ p: 4, pb: 8, textAlign: 'center' }}>
          <Button onClick={loadMorePost} variant="outlined">
            Load more post
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', p: 4, pb: 8 }}>
          No more post
        </Typography>
      )}
    </Stack>
  );
};

export default PostList;
