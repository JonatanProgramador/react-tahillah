import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import ShowPraise from "../components/ShowPraise";
import SesionChoosePage from "./SesionChoosePage";
import { chooseContext } from "../contexts/ChoosePraiseContext";

const isAdmin = true; //lo tiene que comprobar el server.

const SesionPage = () => {

    const [praise, setPraise] = useState<PraiseInterface>();
    const [isChoose, setIsChoose] = useState(false);

    const context = useContext(chooseContext);

    useEffect(()=>{
        console.log(context?.choosedPraise);
    },[context?.choosedPraise])

    return (
        !isChoose?
        <Box>
            {isAdmin?<Box display={"flex"} justifyContent={"center"}>
                <Button sx={{ marginRight: 1 }} variant="contained">URL</Button>
                <Button onClick={()=>setIsChoose(!isChoose)} sx={{ marginRight: 1 }} variant="contained">Elegir</Button>
            </Box>:<div />}

            {praise?<ShowPraise praise={praise}/>:<div/>}
            
        </Box>:
        <Box>
        <SesionChoosePage/>
        </Box>
    );
}

export default SesionPage;