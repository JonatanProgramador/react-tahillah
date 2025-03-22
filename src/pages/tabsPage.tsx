import React, { useState } from "react";
import DATA from "../data";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

function TabsPage() {
    const [value, setValue] = useState(1);
    const letters = DATA[1].letters;
  
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      event.isTrusted;
      setValue(newValue);
    };

    return(<Box >
        <TabContext value={value}>
            <Tabs sx={{backgroundColor:"white"}} variant='scrollable' scrollButtons="auto" value={value} onChange={handleChange}>
              {letters.map((letter)=>{return (<Tab  key={letter.id} label={letter.summary} value={letter.id}/>);}) }     
            </Tabs>
          {letters.map((letter)=>{return <TabPanel sx={{fontSize:20}} key={letter.id} value={letter.id}>{letter.letter}</TabPanel>}) } 
        </TabContext>
        <Box sx={{display:"flex"}}>
            <Typography sx={{ flexGrow: 1 }} fontSize={20}>{DATA[1].title}</Typography>
            <Typography fontSize={20}>{DATA[1].tone}</Typography>
        </Box>
      </Box>);

     
}

export default TabsPage;