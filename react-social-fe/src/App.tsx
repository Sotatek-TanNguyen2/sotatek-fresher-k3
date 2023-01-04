import React from 'react';
import { CssBaseline } from '@mui/material';
import Router from './router/Router';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router />
    </>
  );
};

export default App;
