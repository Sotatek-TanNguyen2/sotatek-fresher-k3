import { CancelOutlined, Lock, People, Public } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Dialog,
  IconButton,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import GalleryIcon from '../../assets/icons/gallery.svg';
import VideoIcon from '../../assets/icons/video-square.svg';
import ImgAva from '../../assets/images/avatar.svg';
import { SubmitBtn } from '../../pages/LoginPage/styled';
import { ModalTitle, RowStack, Subtitle, Title } from '../common/styled';
import { Item as MenuItem } from '../Profile/styled';
import { Item, PostInput, SmallText } from './styled';

interface CreatePostModalProps {
  open: boolean;
  handleClose: any;
}

const CreatePostModal: React.FC<CreatePostModalProps> = (props) => {
  const [accessType, setAccessType] = useState<string>('public');

  const handleChangeAccessType = (e: SelectChangeEvent) => {
    setAccessType(e.target.value as string);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 800,
          bgcolor: '#fff',
          borderRadius: 5,
          padding: '32px 42px 34px 42px',
        },
      }}
      open={props.open}
      onClose={props.handleClose}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        size="small"
        onClick={props.handleClose}
      >
        <CancelOutlined />
      </IconButton>
      <ModalTitle>Create Post</ModalTitle>

      <RowStack>
        <Avatar
          sx={{
            width: 67,
            height: 67,
          }}
          src={ImgAva}
        />
        <Box ml={2}>
          <Title
            sx={{
              lineHeight: '24px',
            }}
          >
            Nguyen Mai Anh
          </Title>
          <Select
            size="small"
            fullWidth
            value={accessType}
            onChange={handleChangeAccessType}
            sx={{
              mt: 1,
              borderRadius: '6px',
              '& .MuiSelect-select': {
                padding: '7px 12px',
                fontSize: 14,
                fontWeight: 500,
                bgcolor: '#f5f5f5',
              },
              '& fieldset': {
                border: '0 !important',
              },
            }}
          >
            <MenuItem value="public">
              <RowStack>
                <Public fontSize="small" />
                <SmallText>Public</SmallText>
              </RowStack>
            </MenuItem>
            <MenuItem value="friend">
              <RowStack>
                <People fontSize="small" />
                <SmallText>Friend</SmallText>
              </RowStack>
            </MenuItem>
            <MenuItem value="onlyme">
              <RowStack>
                <Lock fontSize="small" />
                <SmallText>Only Me</SmallText>
              </RowStack>
            </MenuItem>
          </Select>
        </Box>
      </RowStack>

      <Box mt={3} height="144px">
        <PostInput
          fullWidth
          multiline
          maxRows={4}
          placeholder="What's on you mind?"
          autoFocus
        />
      </Box>
      <RowStack
        justifyContent="space-between"
        sx={{
          padding: '18px 24px',
          border: '1px solid #c8c8c8',
          borderRadius: '10px',
        }}
      >
        <RowStack>
          <Subtitle
            sx={{
              lineHeight: '24px',
            }}
          >
            Add to your post
          </Subtitle>
        </RowStack>
        <RowStack>
          <Item>
            <img width={20} height={20} src={GalleryIcon} alt="gallery" />
            <Subtitle ml={1}>Image</Subtitle>
          </Item>
          <Item>
            <img width={20} height={20} src={VideoIcon} alt="gallery" />
            <Subtitle ml={1}>Video</Subtitle>
          </Item>
        </RowStack>
      </RowStack>

      <SubmitBtn>Post</SubmitBtn>
    </Dialog>
  );
};

export default CreatePostModal;
