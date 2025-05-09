import { useEffect, useState } from "react";
import UserService from "../services/apirest/UserService";
import { Navigate, Outlet } from "react-router-dom";


export default function Guard() {
    const [isLogin, setIsLogin] = useState<boolean|null>(null);

    useEffect(()=>{
        (async ()=>{
            setIsLogin(await UserService.isLogin());
        })()
    },[])
    if(isLogin === null) {
        return <div></div>
    } else {
        return isLogin ? <Outlet /> : <Navigate to="/login" />
    }
    
}