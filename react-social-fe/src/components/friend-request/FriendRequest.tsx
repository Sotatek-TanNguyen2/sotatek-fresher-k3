import React from 'react';
import { Avatar, Box, Button, IconButton, Stack, SvgIcon } from '@mui/material';
import HandshakeIcon from '../../assets/icons/hand-shake.svg';
import {
  CustomCard,
  CustomDivider,
  RowStack,
  Title,
  ViewAllButton,
} from '../common/styled';
import UserAva from '../../assets/imgs/avatar1.jpg';
import { Cancel, CheckCircle } from '@mui/icons-material';

const FriendRequest: React.FC = () => {
  return (
    <CustomCard
      sx={{
        width: 276,
      }}
    >
      <RowStack justifyContent="center">
        <img src={HandshakeIcon} alt="Hand shake" />
        <Title sx={{ textTransform: 'uppercase', ml: 1 }}>Friend request</Title>
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
              <RowStack>
                <IconButton size="small">
                  <SvgIcon
                    sx={{
                      color: '#4edf9a',
                    }}
                    component={CheckCircle}
                  />
                </IconButton>
                <IconButton size="small">
                  <SvgIcon
                    sx={{
                      color: '#fe6f82',
                    }}
                    component={Cancel}
                  />
                </IconButton>
              </RowStack>
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

export default FriendRequest;
