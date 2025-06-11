import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import ShowPraise from "../components/ShowPraise";
import SesionChoosePage from "./SesionChoosePage";
import { chooseContext } from "../contexts/ChoosePraiseContext";
import PraiseModel from "../models/praiseModel";

const isAdmin = true; //lo tiene que comprobar el server.

const SesionPage = () => {

    const [praise, setPraise] = useState<PraiseInterface>();
    const [isChoose, setIsChoose] = useState(false);

    const context = useContext(chooseContext);

    useEffect(() => {
        if (context && context.choosedPraise !== "") {
            (async () => {
                setPraise(await PraiseModel.getPraise(context.choosedPraise));
                setIsChoose(false);
            })()
        }

    }, [context?.choosedPraise])

    return (
        !isChoose ?
            <Box>
                {isAdmin ? <Box display={"flex"} justifyContent={"center"}>
                    <Button sx={{ marginRight: 1 }} variant="contained">URL</Button>
                    <Button onClick={() => setIsChoose(!isChoose)} sx={{ marginRight: 1 }} variant="contained">Elegir</Button>
                </Box> : <div />}

                {praise ? <ShowPraise praise={praise} /> : <div />}

            </Box> :
            <Box>
                <SesionChoosePage />
            </Box>
    );
}

export default SesionPage;