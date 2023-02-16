import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import {
  Avatar,
  Container,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  SvgIcon,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../../assets/icons/cart.svg';
import GroupIcon from '../../assets/icons/users-alt.svg';
import HomeIcon from '../../assets/icons/home.svg';
import PlayCircleIcon from '../../assets/icons/play-circle.svg';
import Logo from '../../assets/images/logo.svg';
import { logout, selectUser } from '../../redux/slices/authSlice';
import { getUserName } from '../../utils';
import { Avatar32, CustomMenu, RowStack, Title } from '../common/styled';
import {
  HeaderContainer,
  NavBar,
  NavItem,
  NavItemLink,
  NavText,
  Search,
} from './styled';

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
    dispatch(logout());
    navigate('/login');
  };

  return (
    <HeaderContainer position="fixed">
      <Container disableGutters maxWidth="lg">
        <NavBar disableGutters>
          <NavItem>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <Search size="small" placeholder="Search" />
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
                <img src={PlayCircleIcon} alt="Play icon" />
                <NavText>Watch</NavText>
              </NavItem>
            </NavItemLink>
            <NavItemLink to="/">
              <NavItem>
                <img src={CartIcon} alt="Shopping cart icon" />
                <NavText>Martketplace</NavText>
              </NavItem>
            </NavItemLink>
            <NavItemLink to="/">
              <NavItem>
                <img src={GroupIcon} alt="Group icon" />
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
            <Avatar32 src={user?.avatar} />
            <Title
              ml={1.25}
              sx={{
                '&:hover': {
                  color: '#8954C2',
                },
              }}
            >
              {getUserName(user)}
            </Title>
          </NavItem>
        </NavBar>
      </Container>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={CustomMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate(`/profile/${user?.id}`)}>
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
    </HeaderContainer>
  );
};

export default Header;
