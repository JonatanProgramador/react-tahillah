import { ThemeProvider } from '@emotion/react';
import MenuBarSimple from './menuBars/MenuBarSimple';
import Router from './routes/Router';
import theme from './colorPalette';
import { CssBaseline } from '@mui/material';
import './App.css';
import { ChoosePraiseConstext } from './contexts/ChoosePraiseContext';



function App() {
  const elements = (
    <ThemeProvider theme={theme}>
      <ChoosePraiseConstext>
       <CssBaseline/>
      <MenuBarSimple />
      <Router />
      </ChoosePraiseConstext>
    </ThemeProvider>
    ); 

  return elements;
}

export default App
