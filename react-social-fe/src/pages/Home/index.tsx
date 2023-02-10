import { Container, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import CreatePost from '../../components/CreatePost';
import CreatePostModal from '../../components/CreatePost/CreatePostModal';
import FriendBirthday from '../../components/FriendBirthday';
import FriendRequest from '../../components/FriendRequest';
import PostList from '../../components/PostList';
import Profile from '../../components/Profile';
import EditProfileModal from '../../components/Profile/EditProfileModal';
import { Main } from './styled';

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
    <Main>
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
    </Main>
  );
};

export default Home;
