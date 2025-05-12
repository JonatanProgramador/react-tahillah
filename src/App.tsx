import { ThemeProvider } from '@emotion/react';
import MenuBarSimple from './menuBars/MenuBarSimple';
import Router from './routes/Router';
import theme from './colorPalette';
import { CssBaseline } from '@mui/material';
import './App.css';



function App() {
  const elements = (
    <ThemeProvider theme={theme}>
       <CssBaseline/>
      <MenuBarSimple />
      <Router />
    </ThemeProvider>); 

  return elements;
}

export default App
