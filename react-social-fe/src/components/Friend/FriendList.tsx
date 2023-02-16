import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Friend } from '../../redux/slices/userSlice';
import { getUserName } from '../../utils';
import { RowStack } from '../common/styled';
import { Avatar67 } from '../common/styled';
import { BioText } from '../Profile/styled';

interface Props {
  friends: Friend[];
  noData: string;
}

const FriendList: React.FC<Props> = ({ friends, noData }) => {
  return (
    <Grid container spacing={4}>
      {friends.length ? (
        friends.map((friend) => (
          <Grid item xs={12} sm={4} key={friend.id}>
            <Link to={`/profile/${friend?.userReceive?.id}`}>
              <RowStack
                sx={{
                  p: 1.5,
                  borderRadius: '15px',
                  border: '1px solid #e6e6e6',
                }}
              >
                <Avatar67 src={friend?.userReceive?.avatar} />
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
                    {getUserName(friend?.userReceive)}
                  </Typography>
                  <BioText
                    sx={{
                      mt: 0.5,
                      fontSize: 14,
                    }}
                  >
                    {friend?.userReceive?.bio}
                  </BioText>
                </Box>
              </RowStack>
            </Link>
          </Grid>
        ))
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