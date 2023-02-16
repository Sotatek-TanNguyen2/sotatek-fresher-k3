import { Grid, Typography } from '@mui/material';
import React from 'react';
import PostList from '../../components/PostList';
import { BoxWrapper } from './styled';

const Intro: React.FC = () => {
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
        <PostList />
      </Grid>
    </Grid>
  );
};

export default Intro;
