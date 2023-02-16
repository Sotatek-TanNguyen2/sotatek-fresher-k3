import { User } from '../redux/slices/authSlide';

export const getUserName = (user: User | null): string => {
  if (user) return user?.name || user?.username || user?.email.split('@')[0];
  return '';
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
