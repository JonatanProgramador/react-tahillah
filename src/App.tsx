import { ThemeProvider } from '@emotion/react';
import MenuBarSimple from './menuBars/MenuBarSimple';
import Router from './routes/Router';
import theme from './colorPalette';
import { CssBaseline } from '@mui/material';
import './App.css';
import { ChoosePraiseConstext } from './contexts/ChoosePraiseContext';
import { UserSecurityLevel } from './contexts/UserSecurityLevel';



function App() {
  const elements = (
    <ThemeProvider theme={theme}>
      <ChoosePraiseConstext>
        <UserSecurityLevel>
       <CssBaseline/>
      <MenuBarSimple />
      <Router />
      </UserSecurityLevel>
      </ChoosePraiseConstext>
    </ThemeProvider>
    ); 

  return elements;
}

export default App
