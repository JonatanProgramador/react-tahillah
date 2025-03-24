import { AppBar, Box, Button, Toolbar } from "@mui/material";

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

export default function MenuBarSimple() {
    return(<AppBar  sx={{backgroundColor:"white", marginBottom:6}} position="static">
        <Toolbar    disableGutters> 
            <Box width={'100%'}  display={'flex'} justifyContent={'center'} >
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
        </AppBar>);
}