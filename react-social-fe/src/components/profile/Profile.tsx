import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import LikeIcon from '../../assets/icons/heart.svg';
import InstagramIcon from '../../assets/icons/instagram.svg';
import LinkedinIcon from '../../assets/icons/linkedin.svg';
import ViewIcon from '../../assets/icons/view.svg';
import AvaImg from '../../assets/images/avatar.svg';
import {
  CustomCard,
  CustomDivider,
  TimeLocationText,
  RowStack,
  Subtitle,
  Title,
} from '../common/styled';
import { EditButton, FollowText } from './styled';
import { useSelector } from 'react-redux';
import { selectUser } from '../../pages/Auth/authSlide';

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
        <Avatar
          sx={{
            width: 44,
            height: 44,
            mr: '10px',
          }}
          src={AvaImg}
        />
        <Box>
          <Title>
            {user?.name || user?.username || user?.email.split('@')[0]}
          </Title>
          <TimeLocationText>{user?.location || 'null'}</TimeLocationText>
        </Box>
      </RowStack>

      <CustomDivider />

      <Box>
        <RowStack>
          <img src={LikeIcon} alt="Heart icon" />
          <Title ml={1.25}>10K</Title>
          <FollowText ml={0.5}>Follows</FollowText>
        </RowStack>
        <RowStack>
          <img src={ViewIcon} alt="Heart icon" />
          <Title ml={1.25}>600</Title>
          <FollowText ml={0.5}>Following</FollowText>
        </RowStack>
        <Typography
          sx={{
            fontSize: 12,
            color: '#6f6f6f',
            mt: 1.5,
          }}
        >
          {user?.bio || 'This is bio'}
        </Typography>
      </Box>

      <CustomDivider />

      <Box>
        <Subtitle
          sx={{
            textTransform: 'uppercase',
            color: '#6f6f6f',
          }}
        >
          My pages
        </Subtitle>
        <Box mt={1.25}>
          <RowStack>
            <Avatar
              sx={{ width: 24, height: 24 }}
              src={InstagramIcon}
              alt="Instagram icon"
            />
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: '#3f3f3f',
                ml: 1,
              }}
            >
              maianh_1312
            </Typography>
          </RowStack>
          <RowStack mt={1.25}>
            <Avatar
              sx={{ width: 24, height: 24 }}
              src={LinkedinIcon}
              alt="Linkedin Icon"
            />
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: '#3f3f3f',
                ml: 1,
              }}
            >
              maianh_1312
            </Typography>
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
