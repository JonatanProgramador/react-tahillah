import { Box } from "@mui/material";
import PraiseSearch from "../components/PraiseSearch";
import { useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import TypePraise from "../components/TypePraise";


export default function SesionChoosePage() {

    const [sending, setSending] = useState(false);
    const[praises, setPraises] = useState<PraiseInterface[]>();
    
    return(
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <PraiseSearch sending={sending} setPraises={setPraises} setSending={setSending}/>
            <TypePraise/>
        </Box>
    );
}