import { Box, Button, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataInterface from "../interface/DataInterface";
import PraiseModel from "../models/praiseModel";


export default function ListPraise() {

    const[praises, setPraises] = useState<DataInterface[]>();
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
        setPraises(await PraiseModel.getPraises());
        })()
    },[]);

    function onClick(id:number) {
        navigate('/showPraise/'+id);
    }

   

    return (<Box  display={'flex'} flexDirection={"column"} alignItems={'center'} >
        <Box marginBottom={1}  display={'flex'}>
            <Button href="/createPraise" variant="contained">Crear</Button>
        </Box>
        <List sx={{ bgcolor: 'background.paper', maxWidth: '200px', padding:0 }}>
            {praises?.map((praise)=> {
                return ( <React.Fragment key={praise.id}><ListItemButton sx={{paddingBottom:0}} onClick={()=>{onClick(praise.id)}} >
                    <ListItemText primary={praise.title} secondary={praise.type} />
                </ListItemButton>
                <Divider /></React.Fragment>);
            })}
           
        </List>
    </Box>);
}