import { useEffect, useState } from "react";
import UserService from "../services/apirest/UserService";
import { Navigate, Outlet } from "react-router-dom";


interface props {
    securityLevel: number,
};

const Guard:React.FC<props> = ({securityLevel}) => {
    const [isLogin, setIsLogin] = useState<number|null>(null);

    useEffect(()=>{
        (async ()=>{
            setIsLogin(await UserService.isLogin());
        })()
    },[])
    if(isLogin === null) {
        return <div></div>
    } else {
        return isLogin >= securityLevel ? <Outlet /> : <Navigate to="/login" />
    }
    
}

export default Guard;