import { createTheme } from '@mui/material/styles';

export const PRIMARY = '#2798F5';
export const PRIMARY_DARK = '#1A6FB3';
export const SECONDARY = '#cfef00';
export const BG_DEFAULT = '#242424';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY,
      dark: PRIMARY_DARK,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: BG_DEFAULT,
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
    },
    info: {
      main: '#646cff',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
