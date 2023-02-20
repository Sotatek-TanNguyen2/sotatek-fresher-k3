import { HowToReg, PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar150, CustomMenu } from '../../components/common/styled';
import FriendList from '../../components/Friend';
import { Transition } from '../../components/PostList/Post';
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
import {
  acceptFriendAPI,
  getUserFriendAPI,
  requestFriendAPI,
} from '../../services/friend';
import { getPostOfUserAPI } from '../../services/post';
import { getUserInfoAPI } from '../../services/user';
import { getRelation, getUserName } from '../../utils';
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
  const [value, setValue] = useState(0);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  const friends = useSelector(selectFriends);
  const followers = useSelector(selectFollowers);
  const followings = useSelector(selectFollowings);
  const [relation, setRelation] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMenu, setResponseMenu] = useState<null | HTMLElement>(null);
  const responseMenuOpen = Boolean(responseMenu);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setResponseMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setResponseMenu(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const loadAllPostUser = async () => {
    dispatch(startLoadingPost());
    try {
      const { data } = await getPostOfUserAPI(Number(id));
      dispatch(
        getAll({
          page: 1,
          totalPage: data.metadata.totalPage,
          posts: data.data,
        })
      );
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
    setRelation(
      getRelation(friends, followers, followings, user?.id, userInfo?.id)
    );
  }, [friends, followers, followings, user?.id, userInfo?.id]);

  useEffect(() => {
    loadAllPostUser();
    loadUserFriend();
    loadUserInfo();
    setValue(0);
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickAddFriend = async (e: React.MouseEvent<HTMLElement>) => {
    setLoading(true);
    if (relation === 'FRIEND') {
      handleOpenDialog();
    } else if (relation === 'FOLLOWING') {
      try {
        await requestFriendAPI(Number(id));
      } catch (error: any) {}
    } else if (relation === 'FOLLOWER') {
      handleOpenMenu(e);
    } else {
      try {
        await requestFriendAPI(Number(id));
      } catch (error: any) {}
    }
    loadUserFriend();
    setLoading(false);
  };

  const handleUnfriend = async () => {
    setLoading(true);
    try {
      await acceptFriendAPI(Number(id));
      toast.success('Unfriend successfully');
      loadUserFriend();
      handleCloseDialog();
    } catch (error: any) {}
    setLoading(false);
  };

  const handleAcceptFriend = async () => {
    setLoading(true);
    try {
      await acceptFriendAPI(Number(id));
      toast.success('Accept friend successfully');
      handleCloseMenu();
      loadUserFriend();
    } catch (error: any) {}
    setLoading(false);
  };

  const handleRejectFriend = async () => {
    setLoading(true);
    try {
      await acceptFriendAPI(Number(id));
      toast.success('Reject friend successfully');
      loadUserFriend();
      handleCloseMenu();
    } catch (error: any) {}
    setLoading(false);
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
              <LoadingButton
                loading={loading}
                variant="contained"
                loadingPosition="start"
                startIcon={
                  relation === 'FRIEND' ? (
                    <HowToReg />
                  ) : relation === 'FOLLOWING' ? (
                    <PersonRemove />
                  ) : relation === 'FOLLOWER' ? (
                    <HowToReg />
                  ) : (
                    <PersonAddAlt1 />
                  )
                }
                sx={{ marginLeft: 'auto', fontWeight: 700 }}
                onClick={handleClickAddFriend}
                aria-controls={responseMenuOpen ? 'reponse-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={responseMenuOpen ? 'true' : undefined}
              >
                {relation === 'FRIEND'
                  ? 'Friends'
                  : relation === 'FOLLOWING'
                  ? 'Cancel Request'
                  : relation === 'FOLLOWER'
                  ? 'Response'
                  : 'Add Friend'}
              </LoadingButton>
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

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="delete-post"
      >
        <DialogTitle textAlign="center">
          Unfriend {getUserName(userInfo)}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-post">
            Are you sure you want to remove {getUserName(userInfo)} as your
            friend?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            onClick={handleUnfriend}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={responseMenu}
        id="reponse-menu"
        open={responseMenuOpen}
        onClose={handleCloseMenu}
        PaperProps={CustomMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleAcceptFriend}>Confirm</MenuItem>
        <MenuItem onClick={handleRejectFriend}>Delete request</MenuItem>
      </Menu>
    </Main>
  );
};

export default Profile;
