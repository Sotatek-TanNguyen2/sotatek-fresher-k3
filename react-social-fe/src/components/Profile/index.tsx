import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import LikeIcon from '../../assets/icons/follow.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import ViewIcon from '../../assets/icons/view.svg';
import { selectUser } from '../../redux/slices/authSlice';
import { getUserName } from '../../utils';
import {
  Avatar24,
  CustomCard,
  CustomDivider,
  RowStack,
  TimeLocationText,
  Title,
} from '../common/styled';
import {
  BioText,
  EditButton,
  FollowText,
  MyPage,
  PageUsername,
  ProfileAvatar,
} from './styled';

interface ProfileProps {
  openModal: () => void;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const user = useSelector(selectUser);

  return (
    <CustomCard
      sx={{
        width: 276,
      }}
    >
      <RowStack>
        <ProfileAvatar src={user?.avatar} />
        <Box>
          <Title>{getUserName(user)}</Title>
          <TimeLocationText>{user?.location}</TimeLocationText>
        </Box>
      </RowStack>

      <CustomDivider />

      <Box>
        <RowStack>
          <img src={LikeIcon} alt="Heart icon" />
          <Title ml={1.25}>10K</Title>
          <FollowText ml={0.5}>Followers</FollowText>
        </RowStack>
        <RowStack>
          <img src={ViewIcon} alt="Heart icon" />
          <Title ml={1.25}>600</Title>
          <FollowText ml={0.5}>Following</FollowText>
        </RowStack>
        <BioText>{user?.bio}</BioText>
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
      <EditButton
        onClick={props.openModal}
        fullWidth
        size="small"
        variant="outlined"
      >
        Edit
      </EditButton>
    </CustomCard>
  );
};

export default Profile;
