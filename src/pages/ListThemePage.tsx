import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/apirest/UserService";
import LoadingPage from "./LoadingPage";
import TypePraise from "../components/TypePraise";


const ListThemePage = () => {

    const [isLogin, setIsLogin] = useState<boolean|null>(null);

    useEffect(() => {
        (async () => {
            setIsLogin(await UserService.isLogin());
        })()
    }, []);

    return (
        isLogin !== null?
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            {isLogin?<Button sx={{ marginBottom: 5 }} disabled={!isLogin} href="/createPraise" variant="contained">Crear</Button>:null}
            <TypePraise/>
        </Box>:<LoadingPage/>
    );
}

export default ListThemePage;