import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserService from "../services/apirest/UserService";
import LoadingPage from "./LoadingPage";
import TypePraise from "../components/TypePraise";
import ListPraises from "../components/ListPraises";
import { userSecurityLevelContext } from "../contexts/UserSecurityLevel";


const ListThemePage = () => {

    const [typePraises, setTypePraises] = useState("");
    const { userSecurityLevel, setUserSecurityLevel } = useContext(userSecurityLevelContext);

    useEffect(() => {
       setUserSecurityLevel();
    }, []);

    return (
        userSecurityLevel !== -1?
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            {userSecurityLevel > 0?<Button sx={{ marginBottom: 5 }}  href="/createPraise" variant="contained">Crear</Button>:null}
            {typePraises===""?<TypePraise setType={setTypePraises}/>:<ListPraises type={typePraises} mode="show"/>}
        </Box>:<LoadingPage/>
    );
}

export default ListThemePage;