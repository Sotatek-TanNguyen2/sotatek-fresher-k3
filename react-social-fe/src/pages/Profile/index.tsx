import { HowToReg, PersonAddAlt1, PersonRemove } from '@mui/icons-material';
import { Avatar, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar150 } from '../../components/common/styled';
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Main>
      <ContainerMain disableGutters maxWidth="lg">
        <BoxTop>
          <Row>
            <Avatar150 />
            <Box>
              <Name variant="h4">Ngoc Tan</Name>
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
