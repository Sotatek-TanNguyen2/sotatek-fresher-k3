import { HowToReg, PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { Avatar, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar150 } from '../../components/common/styled';
import FriendList from '../../components/Friend';
import { selectUser } from '../../redux/slices/authSlice';
import {
  endLoading as endLoadingPost,
  getAll,
  startLoading as startLoadingPost,
} from '../../redux/slices/postSlice';
import {
  endLoading as endLoadingUser,
  getFollowers,
  getFollowings,
  getFriends,
  selectFollowers,
  selectFollowings,
  selectFriends,
  selectUserInfo,
  setUser,
  startLoading as startLoadingUser,
} from '../../redux/slices/userSlice';
import { getPostOfUserAPI } from '../../services/post';
import { getUserFriendAPI, getUserInfoAPI } from '../../services/user';
import { getUserName } from '../../utils';
import { ContainerMain, Main } from '../Home/styled';
import Post from './Post';
import {
  AvtGr,
  BoxTop,
  MenuTab,
  MenuTabs,
  MutualFriends,
  Name,
  Row,
  TabsWrapper,
} from './styled';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const Profile: React.FC = () => {
  const [isFriend, setIsFriend] = useState<string>('');
  const [value, setValue] = useState(0);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  const friends = useSelector(selectFriends);

  const loadAllPostUser = async () => {
    dispatch(startLoadingPost());
    try {
      const { data } = await getPostOfUserAPI(Number(id));
      dispatch(getAll(data.data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoadingPost());
    }
  };

  const loadUserInfo = async () => {
    try {
      const { data } = await getUserInfoAPI(Number(id));
      dispatch(setUser(data.data));
    } catch (error: any) {}
  };

  const loadUserFriend = async () => {
    dispatch(startLoadingUser());
    try {
      const { data } = await getUserFriendAPI(Number(id));
      dispatch(getFriends(data.data.friends));
      dispatch(getFollowers(data.data.followers));
      dispatch(getFollowings(data.data.followings));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoadingUser());
    }
  };

  useEffect(() => {
    loadAllPostUser();
    loadUserFriend();
    loadUserInfo();
    setValue(0);
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Main>
      <ContainerMain disableGutters maxWidth="lg">
        <BoxTop>
          <Row>
            <Avatar150 src={userInfo?.avatar} />
            <Box>
              <Name variant="h4">{getUserName(userInfo)}</Name>
              <MutualFriends variant="subtitle1">
                {friends.length
                  ? `${friends.length} friend${friends.length > 1 ? 's' : ''}`
                  : `No friends`}
              </MutualFriends>
              <AvtGr total={friends.length}>
                {friends.map((friend) => (
                  <Avatar key={friend.id} src={friend?.userReceive?.avatar} />
                ))}
              </AvtGr>
            </Box>
            {user?.id !== Number(id) && (
              <Button
                variant="contained"
                startIcon={
                  isFriend === 'friends' ? (
                    <HowToReg />
                  ) : isFriend === 'following' ? (
                    <PersonRemove />
                  ) : (
                    <PersonAddAlt1 />
                  )
                }
                sx={{ marginLeft: 'auto', fontWeight: 700 }}
                onClick={() =>
                  setIsFriend(
                    ['', 'following', 'friends'][Math.floor(Math.random() * 3)]
                  )
                }
              >
                {isFriend === 'friends'
                  ? 'Friends'
                  : isFriend === 'following'
                  ? 'Cancel Request'
                  : 'Add Friend'}
              </Button>
            )}
          </Row>

          <TabsWrapper>
            <MenuTabs
              value={value}
              onChange={handleChange}
              aria-label="profile tabs"
            >
              <MenuTab label="Posts" {...a11yProps(0)} />
              <MenuTab label="Friends" {...a11yProps(1)} />
              <MenuTab label="Photos" {...a11yProps(2)} />
              <MenuTab label="Videos" {...a11yProps(3)} />
            </MenuTabs>
          </TabsWrapper>
        </BoxTop>

        <TabPanel value={value} index={0}>
          <Post userId={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FriendList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Photos
        </TabPanel>
        <TabPanel value={value} index={3}>
          Videos
        </TabPanel>
      </ContainerMain>
    </Main>
  );
};

export default Profile;
