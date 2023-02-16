import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PostList from '../../components/PostList';
import {
  endLoading,
  getAll,
  selectPosts,
  startLoading,
} from '../../redux/slices/postSlide';
import { getPostOfUserAPI } from '../../services/post';
import { BoxWrapper } from './styled';

interface Props {
  userId: string | undefined;
}

const Intro: React.FC<Props> = ({ userId }) => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const loadAllPostUser = async () => {
    dispatch(startLoading());
    try {
      const { data } = await getPostOfUserAPI(Number(userId));
      dispatch(getAll(data.data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllPostUser();
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <BoxWrapper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Intro
          </Typography>
        </BoxWrapper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <PostList posts={posts} />
      </Grid>
    </Grid>
  );
};

export default Intro;
