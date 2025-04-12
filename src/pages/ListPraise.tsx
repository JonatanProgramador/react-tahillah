import { Box, Button, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";


export default function ListPraise() {

    const[praises, setPraises] = useState<PraiseInterface[]>();
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
        setPraises(await PraiseModel.getPraises());
        })()
    },[]);

    useEffect(()=>{
        console.log(praises);
    },[praises]);

   

    return (<Box  display={'flex'} flexDirection={"column"} alignItems={'center'} >
        <Box marginBottom={1}  display={'flex'}>
            <Button href="/createPraise" variant="contained">Crear</Button>
        </Box>
        <List sx={{ bgcolor: 'background.paper', maxWidth: '200px', padding:0 }}>
            {praises?.map((praise, index)=> {
                return ( <React.Fragment key={index}><ListItemButton sx={{paddingBottom:0}} onClick={()=>navigate('/showPraise/'+praise._id)} >
                    <ListItemText primary={praise.title} secondary={praise.type} />
                </ListItemButton>
                {praises.length!==index+1?<Divider />:null}</React.Fragment>);
            })}
        </List>
    </Box>);
}