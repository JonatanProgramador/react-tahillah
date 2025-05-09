import { Box } from "@mui/material";
import  { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";
import CardPraise from "../components/CardPraise";
import LoadingPage from "./LoadingPage";


export default function ListPraise() {
    const [praises, setPraises] = useState<PraiseInterface[]>();
    const params = useParams();

    useEffect(() => {
        (async () => {
            const type = params.type;
            if (type) {
                setPraises(await PraiseModel.searchPraise("type", type==="jubilo"?"Júbilo":"Adoración", true));
            }
        })()
    }, []);


    return (praises?<Box display={'flex'} flexDirection={"column"} alignItems={'center'} >
        {praises?.map((praise)=>{
            return <CardPraise key={praise._id} praise={praise}/>
        })}
    </Box>:<LoadingPage/>);
}