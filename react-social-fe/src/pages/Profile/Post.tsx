import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PostList from '../../components/PostList';
import { selectPosts } from '../../redux/slices/postSlice';
import { BoxWrapper } from './styled';

interface Props {
  userId: string | undefined;
}

const Intro: React.FC<Props> = ({ userId }) => {
  const posts = useSelector(selectPosts);

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
