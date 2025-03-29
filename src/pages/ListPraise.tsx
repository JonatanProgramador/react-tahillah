import { Box, Button, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataInterface from "../interface/DataInterface";
import PraiseService from "../services/localstorage/PraiseService";
import praiseContext from "../contexs/praisesContext";


export default function ListPraise() {

    const[praises, setPraises] = useState<DataInterface[]>();
    const navigate = useNavigate();
    const praisess = useContext(praiseContext());

    useEffect(()=>{
        setPraises(praisess.getPraises());
    },[]);

    function onClick(id:number) {
        navigate('/showPraise/'+id);
    }

    function createPraise(praise:DataInterface){
        console.log(praise);
    }

    return (<Box  display={'flex'} flexDirection={"column"} alignItems={'center'} >
        <Box marginBottom={1}  display={'flex'}>
            <Button href="/createPraise" variant="contained">Crear</Button>
        </Box>
        <List sx={{ bgcolor: 'background.paper', maxWidth: '200px', padding:0 }}>
            {praises?.map((praise)=> {
                return ( <React.Fragment key={praise.id}><ListItemButton onClick={()=>{onClick(praise.id)}} >
                    <ListItemText primary={praise.title} secondary={praise.type} />
                </ListItemButton>
                <Divider /></React.Fragment>);
            })}
           
        </List>
    </Box>);
}