import React, {  useEffect, useState } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";

function TabsPage() {

    const [value, setValue] = useState(1);
    const [praise, setPraise] = useState<PraiseInterface>();
    const params = useParams();
    const id = params.id?Number.parseInt(params.id):-1;
    
    useEffect(() => {
      (async()=>{
      setPraise(await PraiseModel.getPraise(id));
    })()
    }, []);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      event.isTrusted;
      setValue(newValue);
    };

    function deletePraise() {
      PraiseModel.deletePraise(id);
    }

    const [position, setPosition] = useState({start:{ x: 0, y: 0 }, end:{x: 0, y: 0}});

    function touchStart(event:React.TouchEvent<HTMLDivElement>) {
      setPosition({start:{x:event.touches[0].clientX, y:event.touches[0].clientY}, end:position.end})
    }

    function touchMove(event:React.TouchEvent<HTMLDivElement>) {
      setPosition({start:position.start, end:{x:event.touches[0].clientX, y:event.touches[0].clientY}})
    }

    function touchEnd() {
      const trige = 50
      if((position.end.x-position.start.x) > trige) {
        if(praise){
          setValue(value > 1?value-1:value);
          }
      }

      if((position.start.x-position.end.x) > trige) {
        if(praise){
        setValue(praise?.letters.length > value?value+1:value);
        }
      }
    }

    return(<Box >
       <Box padding={1} justifyContent={"center"} display={"flex"}>
        <Button onClick={()=>deletePraise()}  sx={{marginRight:1}} variant="contained">Eliminar</Button>
        <Button href={"/editPraise/"+id}  variant="contained">Editar</Button>
      </Box>
        <TabContext  value={value}>
          {praise?.letters.map((letter)=>{return <TabPanel  onTouchEnd={()=>touchEnd()} onTouchMove={(event)=>touchMove(event)} onTouchStart={(event)=>touchStart(event)} sx={{fontSize:20, textAlign:"center", minHeight:"60vh"}} key={letter.id} value={letter.id}>{letter.letter}</TabPanel>}) } 
          <Tabs  variant='scrollable' scrollButtons="auto" value={value} onChange={handleChange}>
              {praise?.letters.map((letter)=>{return (<Tab  key={letter.id} label={letter.summary} value={letter.id}/>);}) }     
            </Tabs>
        </TabContext>
        <Box display="flex" margin={1}>
            <Typography color="textSecondary" sx={{ flexGrow: 1 }} fontSize={20}>{praise?.title}</Typography>
            <Typography color="textSecondary" fontSize={20}>{praise?.tone}</Typography>
        </Box>
      </Box>);

     
}

export default TabsPage;