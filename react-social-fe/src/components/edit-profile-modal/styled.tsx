import { Button, MenuItem, styled } from '@mui/material';
import { Input } from '../../pages/Auth/styled';
import { CustomText } from '../common/styled';

export const ModalTitle = styled(CustomText)({
  fontSize: 28,
  fontWeight: 700,
  textAlign: 'center',
});

export const Title = styled(CustomText)({
  fontSize: 24,
  fontWeight: 600,
  flexGrow: 1,
});

export const TextContent = styled(CustomText)({
  fontSize: 14,
});

export const CustomButton = styled(Button)({
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 6,
  padding: '12px 32px 10px',
});

export const SaveButton = styled(CustomButton)({
  color: '#fff',
  backgroundColor: '#8954C2',
  '&:hover': {
    backgroundColor: '#8954C2',
  },
});

export const CancelButton = styled(CustomButton)({
  color: '#181818',
  backgroundColor: '#F5F5F5',
  marginRight: 16,
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

export const CustomInput = styled(Input)({
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontWeight: 400,
    color: '#29282b',
    lineHeight: '21px',
  },
});

export const Item = styled(MenuItem)({
  fontSize: 14,
  fontWeight: 400,
  color: '#29282b',
});
