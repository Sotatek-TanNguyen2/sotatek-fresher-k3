import React from 'react';
import { Avatar, Box, IconButton, Stack } from '@mui/material';
import {
  CustomCard,
  RowStack,
  TimeLocationText,
  Title,
} from '../common/styled';
import { MoreHoriz } from '@mui/icons-material';
import AvaImg from '../../assets/images/avatar.svg';
import Post from './Post';

const PostList: React.FC = () => {
  return (
    <Stack spacing={2}>
      {[1, 2, 3].map((item) => (
        <Post key={item} />
      ))}
    </Stack>
  );
};

export default PostList;
