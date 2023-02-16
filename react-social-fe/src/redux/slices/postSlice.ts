import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authSlice';

export interface PostMedia {
  id: number;
  url: string;
  type: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  user: User;
}

export interface Post {
  id: number;
  content: string;
  access: string;
  createdAt: Date;
  user: User;
  likes: User[];
  media: PostMedia[];
  comments: Comment[];
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  post?: Post;
  page: number;
}

const initialState: PostState = {
  posts: [],
  loading: true,
  page: 1,
};

export const postSlide = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startLoading: (state: PostState) => {
      state.loading = true;
    },
    endLoading: (state: PostState) => {
      state.loading = false;
    },
    getAll: (state: PostState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    createPost: (state: PostState, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (
      state: PostState,
      action: PayloadAction<{ id: number; post: Post }>
    ) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload.post;
    },
    likePost: (
      state: PostState,
      action: PayloadAction<{ id: number; user: User | null }>
    ) => {
      const post = state.posts.find((post) => post.id === action.payload.id);
      if (post) {
        if (post.likes.find((like) => like.id === action.payload.user?.id))
          post.likes = post.likes.filter(
            (like) => like.id !== action.payload.user?.id
          );
        else if (action.payload.user) post.likes.push(action.payload.user);
      }
    },
    deletePost: (state: PostState, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    commentPost: (
      state: PostState,
      action: PayloadAction<{ id: number; comment: Comment }>
    ) => {
      const post = state.posts.find((post) => post.id === action.payload.id);
      if (post) post.comments.push(action.payload.comment);
    },
    editComment: (
      state: PostState,
      action: PayloadAction<{ id: number; comment: Comment }>
    ) => {
      state.posts = state.posts.map((post) => {
        if (post.comments.find((comment) => comment.id === action.payload.id))
          post.comments = post.comments.map((comment) => {
            if (comment.id === action.payload.id) return action.payload.comment;
            return comment;
          });
        return post;
      });
    },
    deleteComment: (state: PostState, action: PayloadAction<number>) => {
      state.posts = state.posts.map((post) => {
        post.comments = post.comments.filter(
          (comment) => comment.id !== action.payload
        );
        return post;
      });
    },
  },
});

export const selectPost = (state: { post: PostState }) => state.post.post;
export const selectPosts = (state: { post: PostState }) => state.post.posts;
export const selectPostLoading = (state: { post: PostState }) =>
  state.post.loading;
export const selectPage = (state: { post: PostState }) => state.post.page;

export const {
  startLoading,
  endLoading,
  getAll,
  createPost,
  updatePost,
  likePost,
  deletePost,
  commentPost,
  editComment,
  deleteComment,
} = postSlide.actions;

export default postSlide.reducer;
