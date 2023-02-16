import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CreatePost from '../../components/CreatePost';
import CreatePostModal from '../../components/CreatePost/CreatePostModal';
import FriendBirthday from '../../components/FriendBirthday';
import FriendRequest from '../../components/FriendRequest';
import PostList from '../../components/PostList';
import Profile from '../../components/Profile';
import EditProfileModal from '../../components/Profile/EditProfileModal';
import {
  endLoading,
  getAll,
  selectPosts,
  startLoading,
} from '../../redux/slices/postSlide';
import { getAllPublicPostAPI } from '../../services/post';
import { ContainerMain, Main } from './styled';

const Home: React.FC = () => {
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const loadAllPublicPost = async () => {
    dispatch(startLoading());
    try {
      const { data } = await getAllPublicPostAPI();
      dispatch(getAll(data.data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    loadAllPublicPost();
  }, []);

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
      <ContainerMain disableGutters maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Profile openModal={handleEditProfileOpen} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={4}>
              <CreatePost handleOpen={handleCreatePostOpen} />
              <PostList posts={posts} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack spacing={4}>
              <FriendRequest />
              <FriendBirthday />
            </Stack>
          </Grid>
        </Grid>
      </ContainerMain>

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
