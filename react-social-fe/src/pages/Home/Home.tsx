import { Box, Container, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import CreatePost from '../../components/create-post/CreatePost';
import EditProfileModal from '../../components/profile/EditProfileModal';
import FriendBirthday from '../../components/friend-birth/FriendBirthday';
import FriendRequest from '../../components/friend-request/FriendRequest';
import PostList from '../../components/post-list/PostList';
import Profile from '../../components/profile/Profile';

const Home: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: '#f6f6f6',
        minHeight: '100vh',
        mt: '90px',
      }}
    >
      <Container sx={{ pt: 4 }} disableGutters maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Profile openModal={handleOpen} />
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={4}>
              <CreatePost />
              <PostList />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={4}>
              <FriendRequest />
              <FriendBirthday />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <EditProfileModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Home;
