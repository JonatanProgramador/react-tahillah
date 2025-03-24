import React, { useEffect, useState } from "react";
import DATA from "../data";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import DataInterface from "../interface/DataInterface";

function TabsPage() {
    const [value, setValue] = useState(1);
    const [praise, setPraise] = useState<DataInterface>();
    const params = useParams();
    useEffect(() => {
      const id = params.id?Number.parseInt(params.id):-1;
      setPraise(DATA[id-1])
    }, []);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      event.isTrusted;
      setValue(newValue);
    };

    return(<Box >
        <TabContext value={value}>
            <Tabs variant='scrollable' scrollButtons="auto" value={value} onChange={handleChange}>
              {praise?.letters.map((letter)=>{return (<Tab  key={letter.id} label={letter.summary} value={letter.id}/>);}) }     
            </Tabs>
          {praise?.letters.map((letter)=>{return <TabPanel sx={{fontSize:20}} key={letter.id} value={letter.id}>{letter.letter}</TabPanel>}) } 
        </TabContext>
        <Box sx={{display:"flex"}}>
            <Typography sx={{ flexGrow: 1 }} fontSize={20}>{DATA[1].title}</Typography>
            <Typography fontSize={20}>{DATA[1].tone}</Typography>
        </Box>
      </Box>);

     
}

export default TabsPage;