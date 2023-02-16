import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { a11yProps, TabPanel } from '../../pages/Profile';
import { MenuTab, MenuTabs, TabsWrapper } from '../../pages/Profile/styled';
import {
  selectFollowers,
  selectFollowings,
  selectFriends,
} from '../../redux/slices/userSlice';
import FriendList from './FriendList';

const Friend: React.FC = () => {
  const [value, setValue] = useState(0);
  const friends = useSelector(selectFriends);
  const followings = useSelector(selectFollowings);
  const followers = useSelector(selectFollowers);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '24px',
      }}
    >
      <TabsWrapper>
        <MenuTabs
          value={value}
          onChange={handleChange}
          aria-label="profile tabs"
        >
          <MenuTab label="All Friends" {...a11yProps(0)} />
          <MenuTab label="Followings" {...a11yProps(1)} />
          <MenuTab label="Followers" {...a11yProps(2)} />
        </MenuTabs>
      </TabsWrapper>
      <TabPanel value={value} index={0}>
        <FriendList friends={friends} noData="No friends" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FriendList friends={followings} noData="No followings" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FriendList friends={followers} noData="No followers" />
      </TabPanel>
    </Box>
  );
};

export default Friend;
