import { styled, SvgIcon } from '@mui/material';

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
