import { AppBar, Box, Button, Toolbar } from "@mui/material";
import ROUTES from "../routes/routes";



export default function MenuBarSimple() {
    return(<AppBar position="static"   sx={{ marginBottom:3, width:"100%"}} >
        <Toolbar   disableGutters> 
            <Box width={'100%'}  display={'flex'} justifyContent={'center'} >
                {ROUTES.map((page) => {
                  if(page.menuBar)
                  return (
                  <Button
                  key={page.id}
                  variant='contained'
                  href={page.url}
                    sx={{marginLeft:1}}
                  >
                    {page.name}
                  </Button>
                )})}
              </Box>
        </Toolbar>
        </AppBar>);
}