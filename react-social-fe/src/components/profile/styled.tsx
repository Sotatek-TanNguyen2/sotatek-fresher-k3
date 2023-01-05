import { Button, Divider, styled, Typography } from '@mui/material';

export const FollowText = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: '#acacac',
});

export const EditButton = styled(Button)({
  textTransform: 'none',
  marginTop: '20px',
  fontSize: 14,
  fontWeight: 500,
  borderColor: '#c8c8c8',
  color: '#6f6f6f',
  paddingTop: '6px',
  paddingBottom: '6px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: '#8954c2',
    color: '#8954c2',
  },
});
