import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar24,
  CustomDivider,
  RowStack,
  TimeLocationText,
  Title,
} from '../../components/common/styled';
import PostList from '../../components/PostList';
import {
  BioText,
  EditButton,
  FollowText,
  MyPage,
  PageUsername,
} from '../../components/Profile/styled';
import { selectPosts } from '../../redux/slices/postSlice';
import {
  selectFollowers,
  selectFollowings,
  selectUserInfo,
} from '../../redux/slices/userSlice';
import { BoxWrapper } from './styled';
import LikeIcon from '../../assets/icons/follow.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import ViewIcon from '../../assets/icons/view.svg';
import { selectUser } from '../../redux/slices/authSlice';
import EditProfileModal from '../../components/Profile/EditProfileModal';
import CreatePost from '../../components/CreatePost';
import CreatePostModal from '../../components/CreatePost/CreatePostModal';

interface Props {
  userId: string | undefined;
}

const UserPost: React.FC<Props> = ({ userId }) => {
  const posts = useSelector(selectPosts);
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const followers = useSelector(selectFollowers);
  const followings = useSelector(selectFollowings);
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
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4}>
        <BoxWrapper sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Intro
          </Typography>

          <Box
            sx={{
              mt: 2,
            }}
          >
            <RowStack>
              <img src={LikeIcon} alt="Heart icon" />
              <Title ml={1.25}>{followers.length}</Title>
              <FollowText ml={0.5}>Followers</FollowText>
            </RowStack>
            <RowStack>
              <img src={ViewIcon} alt="Heart icon" />
              <Title ml={1.25}>{followings.length}</Title>
              <FollowText ml={0.5}>Following</FollowText>
            </RowStack>
            <BioText>{userInfo?.bio}</BioText>
            <TimeLocationText sx={{ mt: 1 }}>
              {userInfo?.location}
            </TimeLocationText>
          </Box>

          <CustomDivider />

          <Box>
            <MyPage>My pages</MyPage>
            <Box mt={1.25}>
              <RowStack>
                <Avatar24 src={InstagramIcon} alt="Instagram icon" />
                <PageUsername>maianh_1312</PageUsername>
              </RowStack>
              <RowStack mt={1.25}>
                <Avatar24 src={LinkedinIcon} alt="Linkedin Icon" />
                <PageUsername>maianh_1312</PageUsername>
              </RowStack>
            </Box>
          </Box>

          {user?.id === userInfo?.id && (
            <EditButton
              onClick={handleEditProfileOpen}
              fullWidth
              size="small"
              variant="outlined"
            >
              Edit
            </EditButton>
          )}
        </BoxWrapper>
      </Grid>
      <Grid item xs={12} sm={8}>
        {user?.id === userInfo?.id ? (
          <Stack spacing={4}>
            <CreatePost handleOpen={handleCreatePostOpen} />
            <PostList posts={posts} />
          </Stack>
        ) : (
          <PostList posts={posts} />
        )}
      </Grid>

      <EditProfileModal
        open={openEditProfile}
        handleClose={handleEditProfileClose}
      />

      <CreatePostModal
        open={openCreatePost}
        handleClose={handleCreatePostClose}
      />
    </Grid>
  );
};

export default UserPost;
