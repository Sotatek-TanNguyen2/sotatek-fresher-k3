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
  SvgIcon,
  Toolbar,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home.svg';
import AvaImg from '../../assets/images/avatar.svg';
import Logo from '../../assets/images/logo.svg';
import { selectUser } from '../../pages/Auth/authSlide';
import { RowStack, Title } from '../common/styled';
import { NavItem, NavItemLink, NavText } from './styled';

const Header: React.FC = () => {
  const user = useSelector(selectUser);

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

          <RowStack>
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
          </RowStack>

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
            <Title ml={1.25}>
              {user?.name || user?.username || user?.email.split('@')[0]}
            </Title>
          </NavItem>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
