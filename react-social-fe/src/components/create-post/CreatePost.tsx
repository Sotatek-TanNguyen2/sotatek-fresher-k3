import React from 'react';
import { Avatar, InputAdornment } from '@mui/material';
import {
  CustomCard,
  CustomDivider,
  RowStack,
  Subtitle,
} from '../common/styled';
import AvaImg from '../../assets/images/avatar.svg';
import { CustomInput, Item } from './styled';
import { Mood } from '@mui/icons-material';
import GalleryIcon from '../../assets/icons/gallery.svg';
import VideoIcon from '../../assets/icons/video-square.svg';
import LinkIcon from '../../assets/icons/link.svg';
import HashtagIcon from '../../assets/icons/hashtag.svg';

const CreatePost: React.FC = () => {
  return (
    <CustomCard>
      <RowStack>
        <Avatar
          sx={{
            width: 44,
            height: 44,
          }}
          src={AvaImg}
        />

        <CustomInput
          fullWidth
          placeholder="Share something"
          endAdornment={
            <InputAdornment position="end">
              <Mood />
            </InputAdornment>
          }
        />
      </RowStack>

      <CustomDivider sx={{ my: 3 }} />

      <RowStack>
        <Item>
          <img width={20} height={20} src={GalleryIcon} alt="gallery" />
          <Subtitle ml={1}>Image</Subtitle>
        </Item>
        <Item>
          <img width={20} height={20} src={VideoIcon} alt="gallery" />
          <Subtitle ml={1}>Video</Subtitle>
        </Item>
        <Item>
          <img width={20} height={20} src={LinkIcon} alt="gallery" />
          <Subtitle ml={1}>Attachment</Subtitle>
        </Item>
        <Item>
          <img width={20} height={20} src={HashtagIcon} alt="gallery" />
          <Subtitle ml={1}>Hashtag</Subtitle>
        </Item>
      </RowStack>
    </CustomCard>
  );
};

export default CreatePost;
