import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';





import Footer from '../components/shared/Footer';
import Hero from '../components/landingpage/Hero';
import AppBar from '../components/shared/AppBarCustom';
import Guidelines from '../components/landingpage/Guidelines';


export default function LandingPage({mode, toggleColorMode} ) {
  
  const defaultTheme = createTheme({ palette: { mode } });
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Guidelines />
       
       
      </Box>
    </ThemeProvider>
  );
}
