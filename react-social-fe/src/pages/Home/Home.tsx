import { Box, Container, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import CreatePost from '../../components/create-post/CreatePost';
import FriendBirthday from '../../components/friend-birth/FriendBirthday';
import FriendRequest from '../../components/friend-request/FriendRequest';
import PostList from '../../components/post-list/PostList';
import Profile from '../../components/profile/Profile';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f6f6f6',
        minHeight: '100vh',
        mt: '90px',
      }}
    >
      <Container disableGutters maxWidth="lg">
        <Grid container spacing={4} sx={{ pt: 4 }}>
          <Grid item xs={3}>
            <Profile />
          </Grid>
          <Grid item xs={6}>
            <CreatePost />
            <PostList />
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={4}>
              <FriendRequest />
              <FriendBirthday />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
