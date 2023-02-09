import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import CommentIcon from '../../assets/icons/chat.svg';
import LikeSolidIcon from '../../assets/icons/heart-solid.svg';
import LikeIcon from '../../assets/icons/heart.svg';
import LeftCircleIcon from '../../assets/icons/left-circle.svg';
import RightCircleIcon from '../../assets/icons/right-circle.svg';
import ShareIcon from '../../assets/icons/share.svg';
import { selectUser } from '../../redux/slices/authSlide';
import { likePost, Post } from '../../redux/slices/postSlide';
import { likePostAPI } from '../../services/post';
import { getUserName } from '../../utils/getName.util';
import {
  Avatar44,
  CustomCard,
  CustomMenu,
  CustomText,
  RowStack,
  Subtitle,
  TimeLocationText,
  Title,
} from '../common/styled';
import { PostImage, SlideNavigationNext, SlideNavigationPrev } from './styled';
import './swiper.css';

interface PostProps {
  post: Post;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
  const user = useSelector(selectUser);
  const [prev, setPrev] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const handleLike = async () => {
    try {
      await likePostAPI(post.id);
      dispatch(likePost({ id: post.id, user }));
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <CustomCard>
      <RowStack>
        <Avatar44 src={post.user?.avatar} />
        <Box ml={1} flexGrow={1}>
          <Title>{getUserName(post.user)}</Title>
          <Tooltip title={moment(post.createdAt).format('LLLL')}>
            <TimeLocationText>
              {moment(post.createdAt).fromNow()}
            </TimeLocationText>
          </Tooltip>
        </Box>
        {user?.id === post.user.id && (
          <IconButton
            size="small"
            onClick={handleClick}
            aria-controls={open ? 'edit-post' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreHoriz />
          </IconButton>
        )}
      </RowStack>

      <CustomText my={2.5}>{post.content}</CustomText>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onBeforeInit={({ params }) => {
          if (params?.navigation) {
            params.navigation.prevEl = navigationPrevRef.current;
            params.navigation.nextEl = navigationNextRef.current;
          }
        }}
        onInit={({ activeIndex, slides }) => {
          if (activeIndex === 0) setPrev(false);
          else setPrev(true);
          if (activeIndex === slides.length - 1) setNext(false);
          else setNext(true);
        }}
        onSlideChange={({ activeIndex, slides }) => {
          if (activeIndex === 0) setPrev(false);
          else setPrev(true);
          if (activeIndex === slides.length - 1) setNext(false);
          else setNext(true);
        }}
      >
        {post.media.map((item) => (
          <SwiperSlide key={item.id}>
            {item.type === 'IMAGE' && (
              <PostImage src={item.url} alt="Post image" />
            )}
          </SwiperSlide>
        ))}

        <SlideNavigationPrev hidden={!prev} ref={navigationPrevRef}>
          <IconButton size="small">
            <img src={LeftCircleIcon} alt="left circle icon" />
          </IconButton>
        </SlideNavigationPrev>
        <SlideNavigationNext hidden={!next} ref={navigationNextRef}>
          <IconButton size="small">
            <img src={RightCircleIcon} alt="right circle icon" />
          </IconButton>
        </SlideNavigationNext>
      </Swiper>
      <RowStack mt={2.5}>
        <RowStack mr={1}>
          <IconButton size="small" onClick={handleLike}>
            <img
              src={
                post.likes.find((like) => like.id === user?.id)
                  ? LikeSolidIcon
                  : LikeIcon
              }
              alt="like icon"
            />
          </IconButton>
          <Subtitle>{post.likes.length}</Subtitle>
        </RowStack>
        <RowStack mr={1}>
          <IconButton size="small">
            <img src={CommentIcon} alt="comment icon" />
          </IconButton>
          <Subtitle>{post.comments.length}</Subtitle>
        </RowStack>
        <RowStack>
          <IconButton size="small">
            <img src={ShareIcon} alt="share icon" />
          </IconButton>
          <Subtitle>0</Subtitle>
        </RowStack>
      </RowStack>

      <Menu
        anchorEl={anchorEl}
        id="edit-post"
        open={open}
        onClose={handleClose}
        PaperProps={CustomMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <SvgIcon
              sx={{
                color: '#8954C2',
              }}
            >
              <Edit fontSize="small" />
            </SvgIcon>
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SvgIcon
              sx={{
                color: '#8954C2',
              }}
            >
              <Delete fontSize="small" />
            </SvgIcon>
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </CustomCard>
  );
};

export default PostItem;
