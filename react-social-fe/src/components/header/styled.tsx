import { Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Subtitle } from '../common/styled';

export const NavText = styled(Subtitle)({
  marginLeft: 8,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#8954C2',
  },
});

export const NavItem = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

export const NavItemLink = styled(Link)({
  ':not(:last-child)': {
    marginRight: 45,
  },
});
