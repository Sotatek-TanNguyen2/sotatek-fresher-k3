import {
  AvatarGroup,
  Box,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

export const TabsWrapper = styled(Box)({
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  marginTop: '12px',
});

export const MenuTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#8954c2',
  },
});

export const MenuTab = styled(Tab)({
  fontWeight: 700,
  fontSize: 15,
  '&.Mui-selected': {
    color: '#8954c2',
  },
});

export const BoxWrapper = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '20px',
  marginBottom: '32px',
});

export const BoxTop = styled(BoxWrapper)({
  padding: '24px',
});

export const AvtGr = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    fontSize: 12,
  },
});

export const MutualFriends = styled(Typography)({
  fontWeight: 500,
  marginTop: '8px',
  color: '#65676b',
});

export const Name = styled(Typography)({
  fontWeight: 700,
  color: '#29282b',
});

export const Row = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  '& > div + div': {
    marginLeft: '24px',
  },
});
