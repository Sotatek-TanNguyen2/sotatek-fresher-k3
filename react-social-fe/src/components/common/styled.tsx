import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Menu,
  Stack,
  styled,
  Typography,
} from '@mui/material';

export const CustomText = styled(Typography)({
  color: '#29282b',
});

export const TimeLocationText = styled(Typography)({
  fontWeight: 400,
  color: '#acacac',
  display: 'inline-block',
});

export const Title = styled(CustomText)({
  fontWeight: 600,
});

export const Subtitle = styled(CustomText)({
  fontWeight: 500,
});

export const CustomDivider = styled(Divider)({
  margin: '16px 0',
  borderColor: '#f1f1f1',
});

export const CustomCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '20px',
  padding: '24px',
});

export const ViewAllButton = styled(Button)({
  color: '#8954c2',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

export const RowStack = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

export const ModalTitle = styled(CustomText)({
  fontSize: 28,
  fontWeight: 700,
  textAlign: 'center',
});

export const Avatar24 = styled(Avatar)({
  width: 24,
  height: 24,
});

export const Avatar32 = styled(Avatar)({
  width: 32,
  height: 32,
});

export const Avatar36 = styled(Avatar)({
  width: 36,
  height: 36,
});

export const Avatar44 = styled(Avatar)({
  width: 44,
  height: 44,
});

export const Avatar67 = styled(Avatar)({
  width: 67,
  height: 67,
});

export const Avatar96 = styled(Avatar)({
  width: 96,
  height: 96,
});

export const Avatar150 = styled(Avatar)({
  width: 150,
  height: 150,
});

export const Modal = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: 800,
    bgcolor: '#fff',
    borderRadius: 5,
    padding: '32px 42px 34px 42px',
  },
});

export const CustomMenu = {
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
};
