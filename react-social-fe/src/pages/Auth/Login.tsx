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

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: '90%', position: 'relative' }}>
        <img height="100%" src={bgLogin} alt="login background" />
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '7%',
            width: '500px',
            bgcolor: '#fff',
            borderRadius: '30px',
            boxShadow: '0px 8px 50px rgba(150, 140, 169, 0.1)',
            padding: '60px',
          }}
        >
          <form action="">
            <Typography fontSize={39} fontWeight={600}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Typography>
            <Typography sx={{ marginBottom: '20px' }}>
              {isSignUp ? 'Have an account?' : "Don't have an account?"}
              <CustomButton onClick={() => setIsSignUp((prev) => !prev)}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </CustomButton>
            </Typography>

            <Label>Email Address</Label>
            <Input fullWidth />
            <Label sx={{ marginTop: '20px' }}>Password</Label>
            <Input
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
                    Terms of Conditions.
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
    </Box>
  );
};

export default Login;
