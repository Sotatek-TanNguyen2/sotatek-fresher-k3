import { Box, InputBase, styled, SvgIcon } from '@mui/material';
import { TimeLocationText } from '../common/styled';

export const PostImage = styled('img')({
  width: '100%',
  borderRadius: '10px',
});

export const PostVideo = styled('video')({
  width: '100%',
  borderRadius: '10px',
});

export const SlideNavigation = styled('div')((props) => ({
  position: 'absolute',
  display: props?.hidden ? 'none' : 'block',
  zIndex: 10,
  top: '50%',
  lineHeight: 1,
  marginTop: '-2em',
  cursor: 'pointer',
}));

export const SlideNavigationPrev = styled(SlideNavigation)({
  left: 0,
});

export const SlideNavigationNext = styled(SlideNavigation)({
  right: 0,
});

export const CommentWrapper = styled(Box)({
  marginTop: '10px',
  '& > div + div': {
    marginTop: '8px',
  },
});

export const CommentContent = styled(Box)({
  marginLeft: '10px',
  padding: '10px',
  backgroundColor: '#f0f2f5',
  borderRadius: '18px',
  flexGrow: 1,
});

export const CommentTime = styled(TimeLocationText)({
  marginLeft: '10px',
  fontSize: 13,
});

export const CommentText = styled(TimeLocationText)({
  color: '#29282b',
});

export const CustomInput = styled(InputBase)({
  marginLeft: '8px',
  backgroundColor: '#f5f5f5',
  borderRadius: '30px',
  padding: '4px 16px',
  fontSize: '16px',
});

export const IconEdit = styled(SvgIcon)({
  color: '#8954C2',
});
