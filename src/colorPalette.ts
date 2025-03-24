import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#16A085',
        light: '#16A085',
        dark: '#16A085',
      },
      secondary: {
        main: '#ECF0F1',
      },
      background: {
        default: '#1A252F',
        paper: '#2C3E50',
      },
      text: {
        primary: '#ECF0F1',
        secondary: '#ECF0F1',
        disabled: '#6c8287',
      },
    },
  });

  export default theme;