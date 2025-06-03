import { Box, Button } from "@mui/material";
import { useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import ShowPraise from "../components/ShowPraise";

const isAdmin = true; //lo tiene que comprobar el server.

const SesionPage = () => {

    const [praise, setPraise] = useState<PraiseInterface>();
    return (
        <Box>
            {isAdmin?<Box display={"flex"} justifyContent={"center"}>
                <Button sx={{ marginRight: 1 }} variant="contained">URL</Button>
                <Button sx={{ marginRight: 1 }} variant="contained">Elegir</Button>
            </Box>:<div />}

            {praise?<ShowPraise praise={praise}/>:<div/>}
            
        </Box>

    );
}

export default SesionPage;