import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar24,
  CustomDivider,
  RowStack,
  Title,
} from '../../components/common/styled';
import PostList from '../../components/PostList';
import {
  BioText,
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

interface Props {
  userId: string | undefined;
}

const Intro: React.FC<Props> = ({ userId }) => {
  const posts = useSelector(selectPosts);
  const userInfo = useSelector(selectUserInfo);
  const followers = useSelector(selectFollowers);
  const followings = useSelector(selectFollowings);

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
        </BoxWrapper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <PostList posts={posts} />
      </Grid>
    </Grid>
  );
};

export default Intro;
