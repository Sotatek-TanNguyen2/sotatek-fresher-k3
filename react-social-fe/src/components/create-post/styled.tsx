import { InputBase, styled } from '@mui/material';
import { RowStack } from '../common/styled';

export const CustomInput = styled(InputBase)({
  marginLeft: '8px',
  backgroundColor: '#f5f5f5',
  borderRadius: '30px',
  padding: '4px 16px',
  fontSize: '16px',
});

export const Item = styled(RowStack)({
  '&:not(:last-child)': {
    marginRight: '24px',
  },
});
