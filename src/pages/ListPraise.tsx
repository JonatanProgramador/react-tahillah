import { Box, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import DATA from "../data";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function ListPraise() {

    const navigate = useNavigate();

    function onClick(id:number) {
        navigate('/showPraise/'+id);
    }
    return (<Box  display={'flex'} justifyContent={'center'} >
        <List sx={{ bgcolor: 'background.paper', maxWidth: '200px', padding:0 }}>
            {DATA.map((praise)=> {
                return ( <React.Fragment key={praise.id}><ListItemButton onClick={()=>{onClick(praise.id)}} >
                    <ListItemText primary={praise.title} secondary={praise.type} />
                </ListItemButton>
                <Divider /></React.Fragment>);
            })}
           
        </List>
    </Box>);
}