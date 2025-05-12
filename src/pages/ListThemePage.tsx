import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/apirest/UserService";
import LoadingPage from "./LoadingPage";


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
            
            <Card sx={{ width: 120, marginBottom: 1 }}>
                <CardActionArea  href="praises/jubilo">
                    <CardContent>
                        <Typography textAlign={"center"} component={"h4"}>Júbilo</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ width: 120, marginBottom: 1 }}>
                <CardActionArea  href="praises/adoracion">
                    <CardContent>
                        <Typography textAlign={"center"} component={"h4"}>Adoración</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>:<LoadingPage/>
    );
}

export default ListThemePage;