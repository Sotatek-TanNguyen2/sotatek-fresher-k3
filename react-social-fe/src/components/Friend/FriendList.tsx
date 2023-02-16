import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../../redux/slices/authSlice';
import { Friend, selectUserInfo } from '../../redux/slices/userSlice';
import { getUserName } from '../../utils';
import { RowStack } from '../common/styled';
import { Avatar67 } from '../common/styled';
import { BioText } from '../Profile/styled';

interface Props {
  friends: Friend[];
  noData: string;
}

export const userRender = (user: User | null, friend: Friend) => {
  if (user?.id === friend?.userReceive?.id) return friend.userRequest;
  if (user?.id === friend?.userRequest?.id) return friend.userReceive;
  if (friend?.userRequest) return friend?.userRequest;
  return friend?.userReceive;
};

const FriendList: React.FC<Props> = ({ friends, noData }) => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Grid container spacing={4}>
      {friends.length ? (
        friends.map((friend) => {
          const userRd = userRender(userInfo, friend);
          return (
            <Grid item xs={12} sm={4} key={friend.id}>
              <Link to={`/profile/${userRd?.id}`}>
                <RowStack
                  sx={{
                    p: 1.5,
                    borderRadius: '15px',
                    border: '1px solid #e6e6e6',
                  }}
                >
                  <Avatar67 src={userRd?.avatar} />
                  <Box
                    sx={{
                      ml: 1.25,
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: '#29282b' }}
                    >
                      {getUserName(userRd)}
                    </Typography>
                    <BioText
                      sx={{
                        mt: 0.5,
                        fontSize: 14,
                      }}
                    >
                      {userRd?.bio}
                    </BioText>
                  </Box>
                </RowStack>
              </Link>
            </Grid>
          );
        })
      ) : (
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: '#29282b', p: 3 }}
        >
          {noData}
        </Typography>
      )}
    </Grid>
  );
};

export default FriendList;
