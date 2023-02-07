import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
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
  textTransform: 'none',
  color: '#8954c2',
  fontWeight: 600,
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

export const Modal = styled(Dialog)({
  '& .MuiDialog-paper': {
    minWidth: 800,
    bgcolor: '#fff',
    borderRadius: 5,
    padding: '32px 42px 34px 42px',
  },
});
