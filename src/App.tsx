import { ThemeProvider } from '@emotion/react';
import MenuBarSimple from './menuBars/MenuBarSimple';
import Router from './routes/Router';
import theme from './colorPalette';
import { CssBaseline } from '@mui/material';



function App() {

  return (
    <ThemeProvider theme={theme}>
       <CssBaseline/>
      <MenuBarSimple />
      <Router />
    </ThemeProvider>
  );

}

export default App
