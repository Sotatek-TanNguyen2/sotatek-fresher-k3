import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  endLoading,
  login,
  selectAuthLoading,
  selectIsAuthenticated,
  startLoading,
} from '../redux/slices/authSlide';
import { getMe } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then((res) => {
        dispatch(startLoading());
        if (res) {
          dispatch(login(res.data.data));
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(endLoading());
      });
  }, []);

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  if (loading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
