import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollPage from './pages/scrollPage';
import TabsPage from './pages/tabsPage';
import CreatePage from './pages/createPage';
import { AppBar, Box, Button, Menu, Toolbar } from '@mui/material';



function App() {
    const pages = [
        {
            id: 1,
            name:"Ejemplo 1",
            url:"/scroll"
        },
        {
            id: 2,
            name:"Ejemplo 2",
            url:"/tabs"
        },
        {
            id: 3,
            name:"Ejemplo 3",
            url:"/accordion"
        }
    ];
    return (<div>
    <AppBar position="static">
    <Toolbar sx={{backgroundColor:"white"}} disableGutters> 
        <Box display={'flex'} >
            {pages.map((page) => (
              <Button
              key={page.id}
              variant='contained'
              href={page.url}

                sx={{marginLeft:1}}
              >
                {page.name}
              </Button>
            ))}
          </Box>
    </Toolbar>
    </AppBar>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<div></div>}></Route>
        <Route path='/scroll' element={<ScrollPage/>}></Route>
        <Route path='/tabs' element={<TabsPage/>}></Route>
        <Route path='/accordion' element={<CreatePage/>}></Route>
    </Routes>
    </BrowserRouter>

    <AppBar position="static"></AppBar>
</div>
);}

export default App
