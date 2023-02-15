import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Slide,
  Tooltip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CommentIcon from '../../assets/icons/chat.svg';
import LikeSolidIcon from '../../assets/icons/heart-solid.svg';
import LikeIcon from '../../assets/icons/heart.svg';
import LeftCircleIcon from '../../assets/icons/left-circle.svg';
import RightCircleIcon from '../../assets/icons/right-circle.svg';
import ShareIcon from '../../assets/icons/share.svg';
import { selectUser } from '../../redux/slices/authSlide';
import {
  commentPost,
  deletePost,
  likePost,
  Post,
} from '../../redux/slices/postSlide';
import {
  commentPostAPI,
  deletePostAPI,
  likePostAPI,
} from '../../services/post';
import { getUserName } from '../../utils/getName.util';
import {
  Avatar32,
  Avatar44,
  CustomCard,
  CustomMenu,
  CustomText,
  RowStack,
  Subtitle,
  TimeLocationText,
  Title,
} from '../common/styled';
import CommentItem from './Comment';
import EditPostModal from './EditPostModal';
import {
  CommentWrapper,
  CustomInput,
  IconEdit,
  PostImage,
  SlideNavigationNext,
  SlideNavigationPrev,
} from './styled';

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface PostProps {
  post: Post;
}

export interface FormValue {
  content: string;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
  const user = useSelector(selectUser);
  const [prev, setPrev] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [editPostEl, setEditPostEl] = useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const editPostMenuOpen = Boolean(editPostEl);
  const { register, handleSubmit, reset } = useForm<FormValue>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);

  const handleEditPostOpen = (e: React.MouseEvent<HTMLElement>) => {
    setEditPostEl(e.currentTarget);
  };

  const handleEditPostClose = () => {
    setEditPostEl(null);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
    setEditPostEl(null);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setEditPostEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeletePost = async () => {
    await handleDelete(post.id);
    setOpenDialog(false);
  };

  const postComment = async (value: FormValue) => {
    setLoadingComment(true);
    try {
      const { data } = await commentPostAPI(post.id, value);
      dispatch(commentPost({ id: post.id, comment: data.data }));
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
    setLoadingComment(false);
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

  const handleDelete = async (id: number) => {
    setLoadingDelete(true);
    try {
      await deletePostAPI(id);
      dispatch(deletePost(id));
      toast.success('Post deleted');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
    setLoadingDelete(false);
  };

  return (
    <>
      <CustomCard>
        <RowStack>
          <Avatar44 src={post.user?.avatar} />
          <Box ml={1} flexGrow={1}>
            <Title>{getUserName(post.user)}</Title>
            <Tooltip title={moment(post.createdAt).add(7, 'h').format('LLLL')}>
              <TimeLocationText>
                {moment(post.createdAt).add(7, 'h').fromNow()}
              </TimeLocationText>
            </Tooltip>
          </Box>
          {user?.id === post.user.id && (
            <IconButton
              size="small"
              onClick={handleEditPostOpen}
              aria-controls={editPostMenuOpen ? 'edit-post' : undefined}
              aria-haspopup="true"
              aria-expanded={editPostMenuOpen ? 'true' : undefined}
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
              // @ts-ignores
              params.navigation.prevEl = navigationPrevRef.current;
              // @ts-ignores
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

        <CommentWrapper>
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

          <RowStack>
            <Avatar32 src={user?.avatar} />
            <Box flexGrow={1}>
              <form onSubmit={handleSubmit(postComment)}>
                <CustomInput
                  fullWidth
                  placeholder="Write a comment..."
                  {...register('content')}
                />
              </form>
            </Box>
          </RowStack>
        </CommentWrapper>
      </CustomCard>

      <Menu
        anchorEl={editPostEl}
        id="edit-post"
        open={editPostMenuOpen}
        onClose={handleEditPostClose}
        PaperProps={CustomMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenEdit}>
          <ListItemIcon>
            <IconEdit>
              <Edit fontSize="small" />
            </IconEdit>
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDialog}>
          <ListItemIcon>
            <IconEdit>
              <Delete fontSize="small" />
            </IconEdit>
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <EditPostModal
        open={openEdit}
        handleClose={handleCloseEdit}
        post={post}
      />

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="delete-post"
      >
        <DialogTitle textAlign="center">Move to your trash?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-post">
            You can restore this post from your trash at any time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loadingDelete}
            variant="contained"
            color="error"
            onClick={handleDeletePost}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostItem;
