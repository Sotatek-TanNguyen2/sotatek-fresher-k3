import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import Profile from '../../components/profile/Profile';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f6f6f6',
        minHeight: '100vh',
        mt: '90px',
      }}
    >
      <Container disableGutters maxWidth="lg">
        <Grid container spacing={4} sx={{ pt: 4 }}>
          <Grid item xs={3}>
            <Profile />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
