import { Avatar, Box, Stack } from '@mui/material';
import React from 'react';
import {
  CustomCard,
  CustomDivider,
  LocationText,
  RowStack,
  Title,
  ViewAllButton,
} from '../common/styled';
import BirthdayCakeIcon from '../../assets/icons/birthday-cake.svg';
import UserAva from '../../assets/imgs/avatar2.jpg';

const FriendBirthday: React.FC = () => {
  return (
    <CustomCard
      sx={{
        width: 276,
      }}
    >
      <RowStack justifyContent="center">
        <img src={BirthdayCakeIcon} alt="Birthday cake" />
        <Title sx={{ textTransform: 'uppercase', ml: 1 }}>Birthday</Title>
      </RowStack>

      <CustomDivider />

      <Box>
        {[1, 2, 3].map((item) => (
          <Stack
            key={item}
            direction="row"
            alignItems="center"
            sx={{
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 51,
                height: 51,
              }}
              src={UserAva}
              alt="avatar"
            />
            <Box ml={1}>
              <Title>Nguyen Mai Anh</Title>
              <LocationText>Hanoi</LocationText>
            </Box>
          </Stack>
        ))}
      </Box>

      <Stack alignItems="center">
        <ViewAllButton size="small">View All</ViewAllButton>
      </Stack>
    </CustomCard>
  );
};

export default FriendBirthday;
