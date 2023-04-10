// client/src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B68EE', // medium slate blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFD700', // goldenrod
      contrastText: '#ffffff',
    },
    background: {
      default: '#1c1c1c', // dark background
      paper: '#272727', // slightly lighter dark background
    },
    text: {
      primary: '#ffffff', // white text
      secondary: '#d3d3d3', // light gray text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '1.75rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
    h5: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '0.8125rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
  },
});

export default theme;
