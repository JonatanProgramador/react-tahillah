import { AppBar, Box, Button, Toolbar } from "@mui/material";
import ROUTES from "../routes/routes";
import { useContext, useEffect } from "react";
import { userSecurityLevelContext } from "../contexts/UserSecurityLevel";



export default function MenuBarSimple() {

  const { userSecurityLevel, setUserSecurityLevel } = useContext(userSecurityLevelContext);

  useEffect(()=>{
    setUserSecurityLevel();
  },[]);

  
    return(true?<AppBar position="static"   sx={{ marginBottom:3, width:"100%"}} >
        <Toolbar   disableGutters> 
            <Box width={'100%'}  display={'flex'} justifyContent={'center'} >
                {ROUTES.map((page) => {
                  if(page.menuBar && userSecurityLevel >= page.securityLevel)
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
        </AppBar>:null);
}