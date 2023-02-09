import { Box, InputBase, Select, styled, Typography } from '@mui/material';
import { SubmitBtn } from '../../pages/LoginPage/styled';
import { RowStack, Subtitle, Title } from '../common/styled';

export const CustomInput = styled(InputBase)({
  marginLeft: '8px',
  backgroundColor: '#f5f5f5',
  borderRadius: '30px',
  padding: '4px 16px',
  fontSize: '16px',
});

export const Item = styled(RowStack)({
  cursor: 'pointer',
  '&:hover > p': {
    textDecoration: 'underline',
  },
  '&:not(:last-child)': {
    marginRight: '24px',
  },
});

export const SmallText = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
  color: '#29282b',
  marginLeft: 8,
});

export const PostInput = styled(InputBase)({
  fontSize: 24,
  fontWeight: 400,
  lineHeight: '36px',
});

export const PostClick = styled(RowStack)({
  backgroundColor: '#f5f5f5',
  marginLeft: '8px',
  borderRadius: '30px',
  padding: '8px 16px',
  flexGrow: 1,
  cursor: 'pointer',
  justifyContent: 'space-between',
});

export const UserName = styled(Title)({
  lineHeight: '24px',
});

export const AccessSelect = styled(Select)({
  marginTop: '8px',
  borderRadius: '6px',
  '& .MuiSelect-select': {
    padding: '7px 12px',
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: '#f5f5f5',
  },
  '& fieldset': {
    border: '0 !important',
  },
});

export const InputBox = styled(Box)({
  minHeight: '144px',
  marginTop: '24px',
});

export const MediaList = styled(RowStack)({
  justifyContent: 'space-between',
  padding: '18px 24px',
  border: '1px solid #c8c8c8',
  borderRadius: '10px',
});

export const MediaText = styled(Subtitle)({
  lineHeight: '24px',
});

export const MediaIcon = styled('img')({
  width: 20,
  height: 20,
});

export const MediaIconText = styled(Subtitle)({
  marginLeft: '8px',
});

export const PostButton = styled(SubmitBtn)({
  '&:disabled': {
    pointerEvents: 'all !important',
    cursor: 'not-allowed',
    backgroundColor: '#c8c8c8',
    color: '#fff',
  },
});
