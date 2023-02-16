import { Friend } from './../redux/slices/userSlice';
import { User } from '../redux/slices/authSlice';

export const getUserName = (user: User | null): string => {
  if (user) return user?.name || user?.username || user?.email.split('@')[0];
  return '';
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getRelation = (
  friends: Friend[],
  followers: Friend[],
  followings: Friend[],
  id: number | undefined,
  friendId: number | undefined
): string => {
  if (
    friends.some(
      (friend) =>
        (friend.userReceive.id === id && friend.userRequest.id === friendId) ||
        (friend.userReceive.id === friendId && friend.userRequest.id === id)
    )
  ) {
    return 'FRIEND';
  } else if (
    followers.some(
      (follower) =>
        follower.userReceive.id === friendId && follower.userRequest.id === id
    )
  ) {
    return 'FOLLOWING';
  } else if (
    followings.some(
      (following) =>
        following.userReceive.id === id && following.userRequest.id === friendId
    )
  ) {
    return 'FOLLOWER';
  }
  return '';
};
