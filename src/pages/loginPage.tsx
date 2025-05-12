import { AlertColor, Box, Button, Paper, TextField } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import {  useEffect, useState } from "react";
import UserService from "../services/apirest/UserService";
import UserInterface from "../interface/UserInterface";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import LoadingPage from "./LoadingPage";


const LoginPage = () => {
    const [sending, setSending] = useState(false);
    const [isLogin, setIsLogin] = useState<boolean|null>(null);
    const [alert, setAlert] = useState({type:"",message:"", show:false});

    const navigation = useNavigate();

    useEffect(()=>{
        (async ()=>{
            setIsLogin(await UserService.isLogin());
        })()
    },[]);

     const formLoginSchema = Yup.object({
            name: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
            password: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        });

    const formik = useFormik({
        validationSchema:formLoginSchema,
        initialValues:{name:"", password:""},
        onSubmit: (values)=>{
            (async ()=>{
                setSending(true);
                const response = await UserService.login(values as UserInterface);
                if(response){
                navigation("/");
            } else {
                setAlert({type:"error",message:"Credenciales incorrectas", show:true});
                setTimeout(()=>{
                    setAlert({...alert, show:false});
                },3000)
            }
            setSending(false);
            })()
        }
    });

    async function logout() {
        setSending(true);
        setIsLogin(!await UserService.logout());
        setSending(false);
    }

    return(isLogin !== null && !sending?
        <Box height={"80vh"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
        <Paper  sx={{width:'fit-content', backgroundColor:"#16A085", padding:5}} elevation={2}>
        {isLogin?<Button  disabled={sending} color="secondary" sx={{backgroundColor:"#1A252F", width:'fit-content'}}  variant="outlined" onClick={()=>logout()}>Salir</Button>:
        <Box alignItems={"center"} display={"flex"} flexDirection={"column"} component={"form"} onSubmit={formik.handleSubmit}>
            <TextField disabled={sending} onChange={formik.handleChange} slotProps={{inputLabel:{style:{color:"white"}}}}   sx={{  width: '150px', backgroundColor: '#2C3E50', marginBottom:1  }} color="secondary" label="Nombre" name="name" id="name"/>
            <TextField disabled={sending} onChange={formik.handleChange} slotProps={{inputLabel:{style:{color:"white"}}}} type="password"   sx={{ width: '150px', backgroundColor: '#2C3E50', marginBottom:1 }} color="secondary" label="Contraseña" name="password" id="password"/>
            <Button  disabled={sending} color="secondary" sx={{backgroundColor:"#1A252F", width:'fit-content'}}  variant="outlined" type="submit">Entrar</Button>
        </Box>}
        </Paper>
        {alert.show?<CustomAlert message={alert.message} type={alert.type as AlertColor}/>:null}
        </Box>
    :<LoadingPage/>);
}

export default LoginPage;