import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#16A085',
      light: '#0c7966',
      dark: '#0c7966',
    },
    secondary: {
      main: '#ECF0F1',
      light: '#0c7966',
      dark: '#41ab00'
    },
    background: {
      default: '#1A252F',
      paper: '#2C3E50',
    },
    text: {
      primary: '#ECF0F1',
      secondary: '#16A085',
      disabled: '#6c8287',
    },
    action:{
      hover:'rgba(255,255,255,0.22)'
    },
    divider: '#ECF0F1',
  },
});

export default theme;