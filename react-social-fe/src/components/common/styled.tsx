import { Box, Button, Divider, styled, Typography } from '@mui/material';

export const CustomText = styled(Typography)({
  fontSize: 14,
  color: '#29282b',
});

export const LocationText = styled(Typography)({
  fontWeight: 400,
  fontSize: 14,
  color: '#acacac',
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
