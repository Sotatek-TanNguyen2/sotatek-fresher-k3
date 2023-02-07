import { User } from './../redux/slices/authSlide';

export const getUserName = (user: User | null): string => {
  if (user) return user?.name || user?.username || user?.email.split('@')[0];
  return '';
};
