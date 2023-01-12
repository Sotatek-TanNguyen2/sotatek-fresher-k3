import {
  GroupOutlined,
  Logout,
  PersonAdd,
  PlayCircleOutline,
  Settings,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Container,
  Divider,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  SvgIcon,
  Toolbar,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home.svg';
import AvaImg from '../../assets/images/avatar.svg';
import Logo from '../../assets/images/logo.svg';
import { logout, selectUser } from '../../pages/Auth/authSlide';
import { RowStack, Title } from '../common/styled';
import { NavItem, NavItemLink, NavText } from './styled';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logout);
    navigate('/login');
  };

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

          <NavItem
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                bgcolor: deepPurple[500],
              }}
              src={AvaImg}
            />
            <Title
              ml={1.25}
              sx={{
                '&:hover': {
                  color: '#8954C2',
                },
              }}
            >
              {user?.name || user?.username || user?.email.split('@')[0]}
            </Title>
          </NavItem>
        </Toolbar>
      </Container>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SvgIcon
              sx={{
                color: '#8954C2',
              }}
            >
              <PersonAdd fontSize="small" />
            </SvgIcon>
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SvgIcon
              sx={{
                color: '#8954C2',
              }}
            >
              <Settings fontSize="small" />
            </SvgIcon>
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <SvgIcon
              sx={{
                color: '#8954C2',
              }}
            >
              <Logout fontSize="small" />
            </SvgIcon>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
