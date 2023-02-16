import { CancelOutlined, Lock, People, Public } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import GalleryIcon from '../../assets/icons/gallery.svg';
import VideoIcon from '../../assets/icons/video-square.svg';
import { selectUser } from '../../redux/slices/authSlide';
import {
  createPost,
  endLoading,
  selectPostLoading,
  startLoading,
} from '../../redux/slices/postSlide';
import { createPostAPI } from '../../services/post';
import { getUserName } from '../../utils';
import { Avatar67, Modal, ModalTitle, RowStack } from '../common/styled';
import { CloseButton, Item as MenuItem } from '../Profile/styled';
import {
  AccessSelect,
  InputBox,
  Item,
  MediaIcon,
  MediaIconText,
  MediaList,
  MediaText,
  PostButton,
  PostInput,
  SmallText,
  UserName,
} from './styled';

interface CreatePostModalProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  files: any;
  content: string;
  access: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = (props) => {
  const [canPost, setCanPost] = useState<boolean>(false);
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const user = useSelector(selectUser);
  const loading = useSelector(selectPostLoading);
  const dispatch = useDispatch();

  const handleAddImage = () => {
    document.getElementById('image')?.click();
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('access', data.access);
    for (let i = 0; i < data.files.length; i++) {
      formData.append('files', data.files[i]);
    }
    dispatch(startLoading());
    try {
      const res = await createPostAPI(formData);
      dispatch(createPost(res.data.data));
      toast.success('Create post successfully!');
      props.handleClose();
      setCanPost(false);
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value?.content?.trim() === '') setCanPost(false);
      else setCanPost(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <CloseButton size="small" onClick={props.handleClose}>
        <CancelOutlined />
      </CloseButton>
      <ModalTitle>Create Post</ModalTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <RowStack>
          <Avatar67 src={user?.avatar} />
          <Box ml={2}>
            <UserName>{getUserName(user)}</UserName>
            <AccessSelect
              size="small"
              fullWidth
              defaultValue="PUBLIC"
              {...register('access')}
            >
              <MenuItem value="PUBLIC">
                <RowStack>
                  <Public fontSize="small" />
                  <SmallText>Public</SmallText>
                </RowStack>
              </MenuItem>
              <MenuItem value="FRIEND">
                <RowStack>
                  <People fontSize="small" />
                  <SmallText>Friend</SmallText>
                </RowStack>
              </MenuItem>
              <MenuItem value="ONLYME">
                <RowStack>
                  <Lock fontSize="small" />
                  <SmallText>Only Me</SmallText>
                </RowStack>
              </MenuItem>
            </AccessSelect>
          </Box>
        </RowStack>

        <InputBox>
          <PostInput
            fullWidth
            multiline
            maxRows={4}
            placeholder="What's on you mind?"
            autoFocus
            {...register('content')}
          />
        </InputBox>
        <MediaList>
          <RowStack>
            <MediaText>Add to your post</MediaText>
          </RowStack>
          <RowStack>
            <Item onClick={handleAddImage}>
              <MediaIcon src={GalleryIcon} alt="gallery" />
              <MediaIconText>Image</MediaIconText>
            </Item>
            <Item>
              <MediaIcon src={VideoIcon} alt="gallery" />
              <MediaIconText>Video</MediaIconText>
            </Item>
          </RowStack>
        </MediaList>
        <input
          id="image"
          accept="image/*"
          type="file"
          hidden
          multiple
          {...register('files')}
        />

        <PostButton
          loading={loading}
          loadingIndicator="Loading..."
          type="submit"
          disabled={!canPost}
        >
          Post
        </PostButton>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
