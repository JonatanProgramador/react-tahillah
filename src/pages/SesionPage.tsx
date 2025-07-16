import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import ShowPraise from "../components/ShowPraise";
import SesionChoosePage from "./SesionChoosePage";
import { chooseContext } from "../contexts/ChoosePraiseContext";
import PraiseModel from "../models/praiseModel";
import { userSecurityLevelContext } from "../contexts/UserSecurityLevel";
import SessionService from "../services/apirest/SessionService";
import PraiseService from "../services/apirest/PraiseService";
import SessionModel from "../models/SessionModel";
import SessionInterface from "../interface/SessionInterface";


const SesionPage = () => {

    const [praise, setPraise] = useState<PraiseInterface>();
    const [isChoose, setIsChoose] = useState(false);

    const { choosedPraise } = useContext(chooseContext);
    const { userSecurityLevel } = useContext(userSecurityLevelContext);

    useEffect(() => {
        (async () => {
            const session = await SessionService.getByUser();
            if (session) {
                setPraise(await PraiseService.getById(session.idPraise));
            }
        })()
    }, [])

    useEffect(() => {
        if (choosedPraise !== "") {
            (async () => {
                if(praise) {
                    await SessionModel.updateSession({idUser:"", idPraise: choosedPraise} as SessionInterface);
                } else {
                    await SessionModel.createSession({idUser:"", idPraise: choosedPraise} as SessionInterface);
                }
                setPraise(await PraiseModel.getPraise(choosedPraise));
                setIsChoose(false);
            })()
        }

    }, [choosedPraise])

    return (
        !isChoose ?
            <Box>
                {userSecurityLevel > 2 ? <Box display={"flex"} justifyContent={"center"}>
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