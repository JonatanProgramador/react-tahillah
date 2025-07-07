import { useContext, useEffect } from "react";
import UserService from "../services/apirest/UserService";
import { Navigate, Outlet } from "react-router-dom";
import { userSecurityLevelContext } from "../contexts/UserSecurityLevel";


interface props {
    securityLevel: number,
};

const Guard:React.FC<props> = ({securityLevel}) => {
   const { userSecurityLevel, setUserSecurityLevel } = useContext(userSecurityLevelContext);

    useEffect(()=>{
       setUserSecurityLevel();
    },[])
    if(userSecurityLevel === -1) {
        return <div></div>
    } else {
        return userSecurityLevel >= securityLevel ? <Outlet /> : <Navigate to="/login" />
    }
    
}

export default Guard;