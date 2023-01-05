import {
  GroupOutlined,
  PlayCircleOutline,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Container,
  InputBase,
  Stack,
  SvgIcon,
  Toolbar,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/imgs/logo.svg';
import { NavItem, NavItemLink, NavText } from './styled';
import HomeIcon from '../../assets/icons/home.svg';
import { deepPurple } from '@mui/material/colors';
import AvaImg from '../../assets/imgs/avatar.svg';
import { Title } from '../common/styled';

const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#fff',
        height: '90px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Container disableGutters maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <NavItem>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <InputBase
              size="small"
              placeholder="Search"
              sx={{
                ml: '19px',
                p: '4px 16px',
                border: '1px solid #eaeaea',
                borderRadius: '20px',
                fontSize: '14px',
              }}
            />
          </NavItem>

          <Stack direction="row">
            <NavItemLink to="/">
              <NavItem>
                <img src={HomeIcon} alt="Home icon" />
                <NavText>Homepage</NavText>
              </NavItem>
            </NavItemLink>
            <NavItemLink to="/">
              <NavItem>
                <SvgIcon
                  sx={{ color: '#8954C2' }}
                  component={PlayCircleOutline}
                />
                <NavText>Watch</NavText>
              </NavItem>
            </NavItemLink>
            <NavItemLink to="/">
              <NavItem>
                <SvgIcon
                  sx={{ color: '#8954C2' }}
                  component={ShoppingCartOutlined}
                />
                <NavText>Martketplace</NavText>
              </NavItem>
            </NavItemLink>
            <NavItemLink to="/">
              <NavItem>
                <SvgIcon sx={{ color: '#8954C2' }} component={GroupOutlined} />
                <NavText>Groups</NavText>
              </NavItem>
            </NavItemLink>
          </Stack>

          <NavItem>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                bgcolor: deepPurple[500],
              }}
              src={AvaImg}
            />
            <Title ml={1.25}>Nguyen Mai Anh</Title>
          </NavItem>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
