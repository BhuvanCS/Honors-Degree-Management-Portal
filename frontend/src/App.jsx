import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppRoutes from './routes';

const App = () => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes mode={mode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  );
};

export default App;
