import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
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
import { WhatsappShareButton } from "react-share";
import { ContentCopy, WhatsApp } from "@mui/icons-material";
import { useParams } from "react-router-dom";


const SesionPage = () => {

    const [praise, setPraise] = useState<PraiseInterface>();
    const [isChoose, setIsChoose] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [sessionId, setSessionId] = useState<string>("");

    const params = useParams();

    const { choosedPraise } = useContext(chooseContext);
    const { userSecurityLevel } = useContext(userSecurityLevelContext);

    useEffect(() => {
        async function getSessionLeader() {
            let session;
            if (params.id === undefined) {
                session = await SessionModel.getSessionByUser();
            } else {
                session = await SessionModel.getSession(params.id);
            }
            if (session) {
                setPraise(await PraiseService.getById(session.idPraise));
                setSessionId(session._id);
            }
        }
            getSessionLeader();

    }, [])

    useEffect(() => {
        if (choosedPraise !== "") {
            (async () => {
                if (praise) {
                    await SessionModel.updateSession({ idUser: "", idPraise: choosedPraise } as SessionInterface);
                } else {
                    await SessionModel.createSession({ idUser: "", idPraise: choosedPraise } as SessionInterface);
                }
                setPraise(await PraiseModel.getPraise(choosedPraise));
                setIsChoose(false);
            })()
        }

    }, [choosedPraise])

    return (
        !isChoose ?
            <Box>
                {userSecurityLevel > 2 && params.id === undefined ? <Box display={"flex"} justifyContent={"center"}>
                    <Button onClick={(event) => { setAnchorEl(event.currentTarget) }} sx={{ marginRight: 1 }} variant="contained">Compartir</Button>
                    <Button onClick={() => setIsChoose(!isChoose)} sx={{ marginRight: 1 }} variant="contained">Elegir</Button>
                    <Menu
                        open={anchorEl !== null}
                        anchorEl={anchorEl}
                        onClose={() => { setAnchorEl(null) }}>
                        <WhatsappShareButton url={window.location.href+"/"+sessionId}>
                            <MenuItem>
                                <ListItemIcon>
                                    <WhatsApp color="primary" />
                                </ListItemIcon>
                                <ListItemText>
                                    WhatsApp
                                </ListItemText>
                            </MenuItem>
                        </WhatsappShareButton>

                        <MenuItem onClick={()=>{navigator.clipboard.writeText(window.location.href+"/"+sessionId)}}>
                            <ListItemIcon>
                                <ContentCopy color="primary" />
                            </ListItemIcon>
                            <ListItemText>
                                Copiar
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
                    : <div />}

                {praise ? <ShowPraise praise={praise} /> : <div />}

            </Box> :
            <Box>
                <SesionChoosePage />
            </Box>
    );
}

export default SesionPage;