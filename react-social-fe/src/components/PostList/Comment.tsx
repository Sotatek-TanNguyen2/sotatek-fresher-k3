import { Delete, Edit, MoreHoriz } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
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
  Tooltip,
} from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlide';
import {
  Comment,
  deleteComment,
  editComment,
} from '../../redux/slices/postSlide';
import { deleteCommentAPI, editCommentAPI } from '../../services/post';
import { getUserName } from '../../utils';
import {
  Avatar36,
  CustomMenu,
  RowStack,
  Title,
  ViewAllButton,
} from '../common/styled';
import { FormValue, Transition } from './Post';
import {
  CancelButton,
  CommentContent,
  CommentText,
  CommentTime,
  CustomInput,
  IconEdit,
} from './styled';

interface Props {
  comment: Comment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const user = useSelector(selectUser);
  const { register, handleSubmit, reset, setValue } = useForm<FormValue>();
  const [editCommentEl, setEditCommentEl] = useState<null | HTMLElement>(null);
  const editCommentMenuOpen = Boolean(editCommentEl);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleEditCommentClose = () => {
    setEditCommentEl(null);
  };

  const handleClickEditComment = () => {
    handleEditCommentClose();
    setIsEditComment(true);
    setValue('content', comment.content);
  };

  const handleCancel = () => {
    setIsEditComment(false);
  };

  const handleOpenDialog = () => {
    setEditCommentEl(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditComment = async (value: FormValue) => {
    try {
      const { data } = await editCommentAPI(comment.id, value);
      console.log(data.data);
      dispatch(editComment({ id: comment.id, comment: data.data }));
      setIsEditComment(false);
      reset();
    } catch (error) {}
  };

  const handleDeleteComment = async () => {
    setLoadingDelete(true);
    try {
      await deleteCommentAPI(comment.id);
      dispatch(deleteComment(comment.id));
    } catch (error) {}
    setLoadingDelete(false);
    setOpenDialog(false);
  };

  return (
    <>
      <RowStack>
        <Avatar36 src={comment.user?.avatar} />
        {isEditComment ? (
          <RowStack flexGrow={1}>
            <form
              style={{ flexGrow: 1 }}
              onSubmit={handleSubmit(handleEditComment)}
            >
              <CustomInput
                fullWidth
                placeholder="Write a comment..."
                {...register('content')}
              />
            </form>
            <CancelButton size="small" onClick={handleCancel}>
              Cancel
            </CancelButton>
          </RowStack>
        ) : (
          <CommentContent>
            <RowStack>
              <Title>{getUserName(comment.user)}</Title>
              <Tooltip title={moment(comment.createdAt).format('LLLL')}>
                <CommentTime>{moment(comment.createdAt).fromNow()}</CommentTime>
              </Tooltip>
            </RowStack>
            <CommentText>{comment.content}</CommentText>
          </CommentContent>
        )}
        {user?.id === comment.user.id && !isEditComment && (
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              setEditCommentEl(e.currentTarget);
            }}
            aria-controls={editCommentMenuOpen ? 'edit-comment' : undefined}
            aria-haspopup="true"
            aria-expanded={editCommentMenuOpen ? 'true' : undefined}
          >
            <MoreHoriz />
          </IconButton>
        )}
      </RowStack>

      <Menu
        anchorEl={editCommentEl}
        id="edit-comment"
        open={editCommentMenuOpen}
        onClose={handleEditCommentClose}
        PaperProps={CustomMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClickEditComment}>
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

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="delete-comment"
      >
        <DialogTitle textAlign="center">
          Are you sure you want to delete this comment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-comment">
            This action cannot be undone.
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
            onClick={handleDeleteComment}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentItem;
