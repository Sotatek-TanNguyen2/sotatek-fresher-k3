import { Box, Container, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import CreatePost from '../../components/create-post/CreatePost';
import EditProfileModal from '../../components/profile/EditProfileModal';
import FriendBirthday from '../../components/friend-birth/FriendBirthday';
import FriendRequest from '../../components/friend-request/FriendRequest';
import PostList from '../../components/post-list/PostList';
import Profile from '../../components/profile/Profile';
import CreatePostModal from '../../components/create-post/CreatePostModal';

const Home: React.FC = () => {
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);

  const handleEditProfileOpen = () => {
    setOpenEditProfile(true);
  };

  const handleEditProfileClose = () => {
    setOpenEditProfile(false);
  };

  const handleCreatePostOpen = () => {
    setOpenCreatePost(true);
  };

  const handleCreatePostClose = () => {
    setOpenCreatePost(false);
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
            <Profile openModal={handleEditProfileOpen} />
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={4}>
              <CreatePost handleOpen={handleCreatePostOpen} />
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
        open={openEditProfile}
        handleClose={handleEditProfileClose}
      />
      <CreatePostModal
        open={openCreatePost}
        handleClose={handleCreatePostClose}
      />
    </Box>
  );
};

export default Home;
