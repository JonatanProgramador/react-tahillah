import { ThemeProvider } from '@emotion/react';
import MenuBarSimple from './menuBars/MenuBarSimple';
import Router from './routes/Router';
import theme from './colorPalette';
import { CssBaseline } from '@mui/material';
import praiseContext from './contexs/praisesContext';
import PraiseService from './services/localstorage/PraiseService';
import PraiseModel from './models/praiseModel';



function App() {

  const context = praiseContext();

  return (
    <ThemeProvider theme={theme}>
       <CssBaseline/>
      <MenuBarSimple />
      <context.Provider value={new PraiseModel()}>
      <Router />
      </context.Provider>
    </ThemeProvider>
  );

}

export default App
