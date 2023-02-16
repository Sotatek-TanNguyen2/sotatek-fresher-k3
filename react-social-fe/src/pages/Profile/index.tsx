import { HowToReg, PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { Avatar, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Avatar150 } from '../../components/common/styled';
import { selectUser } from '../../redux/slices/authSlice';
import {
  endLoading as endLoadingPost,
  getAll,
  startLoading as startLoadingPost,
} from '../../redux/slices/postSlice';
import {
  endLoading as endLoadingUser,
  getUser,
  selectUser as selectUserInfo,
  startLoading as startLoadingUser,
} from '../../redux/slices/userSlice';
import { getPostOfUserAPI } from '../../services/post';
import { getUserInfo } from '../../services/user';
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
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

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

const Profile: React.FC = () => {
  const [isFriend, setIsFriend] = useState<string>('');
  const [value, setValue] = useState(0);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);

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
    dispatch(startLoadingUser());
    try {
      const { data } = await getUserInfo(Number(id));
      dispatch(getUser(data.data));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoadingUser());
    }
  };

  useEffect(() => {
    loadAllPostUser();
    loadUserInfo();
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
                25 mutual friends
              </MutualFriends>
              <AvtGr total={25}>
                <Avatar alt="Remy Sharp" />
                <Avatar alt="Travis Howard" />
                <Avatar alt="Agnes Walker" />
                <Avatar alt="Trevor Henderson" />
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
              aria-label="basic tabs example"
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
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
      </ContainerMain>
    </Main>
  );
};

export default Profile;
