import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { CustomButton, Input, Label, SubmitBtn } from './styled';
import bgLogin from '../../assets/imgs/bg_login.svg';
import { useForm } from 'react-hook-form';
import { login } from '../../services/auth';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async (data: any) => {
    setLoading(true);
    try {
      const response = await login(data.email, data.password);
      setLoading(false);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSignUp = (data: any) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bgLogin})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          transform: 'translateY(-50%)',
          maxWidth: '500px',
          bgcolor: '#fff',
          borderRadius: '30px',
          boxShadow: '0px 8px 50px rgba(150, 140, 169, 0.1)',
          padding: '60px',
        }}
      >
        <form
          onSubmit={
            isSignUp ? handleSubmit(handleSignUp) : handleSubmit(handleLogin)
          }
        >
          <Typography fontSize={39} fontWeight={600}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Typography sx={{ marginBottom: '20px' }}>
            {isSignUp ? 'Have an account?' : "Don't have an account?"}
            <CustomButton
              onClick={() => {
                reset();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </CustomButton>
          </Typography>

          <Label>Email Address</Label>
          <Input
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            })}
            error={!!errors.email}
            helperText={
              (errors.email?.type === 'required' && 'Email is required') ||
              (errors.email?.type === 'pattern' && 'Email is invalid')
            }
            fullWidth
          />
          <Label sx={{ marginTop: '20px' }}>Password</Label>
          <Input
            {...register('password', { required: true, minLength: 6 })}
            error={!!errors.password}
            helperText={
              (errors.password?.type === 'required' &&
                'Password is required') ||
              (errors.password?.type === 'minLength' &&
                'Password must be at least 6 characters')
            }
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isSignUp && (
            <>
              <Label sx={{ marginTop: '20px' }}>Confirm Password</Label>
              <Input
                {...register('confirmPassword', {
                  required: true,
                  minLength: 6,
                })}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword?.type === 'required' &&
                  'Confirm password is required'
                }
                fullWidth
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          {isSignUp && (
            <Stack ml="-9px" direction="row" alignItems="center">
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                size="small"
                sx={{
                  color: '#9854df',
                  '&.Mui-checked': {
                    color: '#b772ff',
                  },
                }}
              />
              <Typography sx={{ display: 'inline-block', fontSize: '13px' }}>
                I accept the{' '}
                <CustomButton href="#" sx={{ display: 'inline-block' }}>
                  Terms & Conditions.
                </CustomButton>
              </Typography>
            </Stack>
          )}

          <SubmitBtn
            loading={loading}
            loadingIndicator="Loading..."
            type="submit"
            variant="contained"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </SubmitBtn>
          {!isSignUp && (
            <CustomButton
              href="#"
              sx={{
                marginTop: '20px',
              }}
            >
              Forgot your password?
            </CustomButton>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login;
