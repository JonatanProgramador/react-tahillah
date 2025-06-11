import { Box } from "@mui/material";
import PraiseSearch from "../components/PraiseSearch";
import { useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import TypePraise from "../components/TypePraise";
import ListPraises from "../components/ListPraises";
import CardPraise from "../components/CardPraise";


export default function SesionChoosePage() {

    const [sending, setSending] = useState(false);
    const[praises, setPraises] = useState<PraiseInterface[]>();
    const[typePraise,setTypePraise] = useState("");

    function handleTypePraise (value:string) {
        setPraises(undefined);
        setTypePraise(value);
    }

    function handleSearchPraises (praisesValues:PraiseInterface[]) {
        setTypePraise("");
        setPraises(praisesValues);
    }
    
    return(
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <PraiseSearch sending={sending} setPraises={handleSearchPraises} setSending={setSending}/>
            <TypePraise  setType={handleTypePraise}/>
            {!praises?<ListPraises mode="choose" type={typePraise}/>:null}
               {praises?.map((praise) => {
                        return <CardPraise mode="choose" key={praise._id} praise={praise} />
                    })}
        </Box>
    );
}