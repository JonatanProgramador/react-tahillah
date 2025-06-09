import { Box } from "@mui/material";
import PraiseSearch from "../components/PraiseSearch";
import { useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import TypePraise from "../components/TypePraise";
import ListPraises from "../components/ListPraises";


export default function SesionChoosePage() {

    const [sending, setSending] = useState(false);
    const[praises, setPraises] = useState<PraiseInterface[]>();
    const[typePraise,setTypePraise] = useState("");
    
    return(
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <PraiseSearch sending={sending} setPraises={setPraises} setSending={setSending}/>
            {typePraise===""?<TypePraise setType={setTypePraise}/>:<ListPraises mode="choose" type={typePraise}/>}
        </Box>
    );
}