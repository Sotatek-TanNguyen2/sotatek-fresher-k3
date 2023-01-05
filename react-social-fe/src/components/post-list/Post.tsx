import {
  ChatBubbleOutline,
  FavoriteBorder,
  MoreHoriz,
} from '@mui/icons-material';
import { Avatar, Box, IconButton, SvgIcon } from '@mui/material';
import React from 'react';
import {
  CustomCard,
  RowStack,
  TimeLocationText,
  Title,
  CustomText,
  Subtitle,
  CustomDivider,
} from '../common/styled';
import AvaImg from '../../assets/imgs/avatar.svg';
import ImgPost from '../../assets/imgs/post-img.svg';
import { PostImage } from './styled';

const Post: React.FC = () => {
  return (
    <CustomCard>
      <RowStack>
        <Avatar sx={{ width: 44, height: 44 }} src={AvaImg} />
        <Box ml={1} flexGrow={1}>
          <Title>Nguyen Mai Anh</Title>
          <TimeLocationText>2 hours ago</TimeLocationText>
        </Box>
        <IconButton size="small">
          <MoreHoriz />
        </IconButton>
      </RowStack>

      <CustomText my={2.5}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout
      </CustomText>
      <PostImage src={ImgPost} alt="Post image" />
      <RowStack mt={2.5}>
        <RowStack mr={1}>
          <IconButton size="small">
            <SvgIcon
              component={FavoriteBorder}
              sx={{
                color: '#e3707f',
              }}
            />
          </IconButton>
          <Subtitle>14</Subtitle>
        </RowStack>
        <RowStack>
          <IconButton size="small">
            <ChatBubbleOutline />
          </IconButton>
          <Subtitle>14</Subtitle>
        </RowStack>
      </RowStack>
    </CustomCard>
  );
};

export default Post;
