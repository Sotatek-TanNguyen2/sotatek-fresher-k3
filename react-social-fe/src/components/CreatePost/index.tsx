import React from 'react';
import { useSelector } from 'react-redux';
import GalleryIcon from '../../assets/icons/gallery.svg';
import HashtagIcon from '../../assets/icons/hashtag.svg';
import LinkIcon from '../../assets/icons/link.svg';
import SmileIcon from '../../assets/icons/smile.svg';
import VideoIcon from '../../assets/icons/video-square.svg';
import { selectUser } from '../../redux/slices/authSlide';
import {
  Avatar44,
  CustomCard,
  CustomDivider,
  RowStack,
  Subtitle,
  TimeLocationText,
} from '../common/styled';
import { Item, PostClick } from './styled';

interface CreatePostProps {
  handleOpen: any;
}

const CreatePost: React.FC<CreatePostProps> = (props) => {
  const user = useSelector(selectUser);

  return (
    <CustomCard>
      <RowStack>
        <Avatar44 src={user?.avatar} />
        <PostClick onClick={props.handleOpen}>
          <TimeLocationText>Share something</TimeLocationText>
          <img src={SmileIcon} alt="smile icon" />
        </PostClick>
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
