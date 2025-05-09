import { Alert, AlertColor } from "@mui/material";

interface props {
    message:string,
    type:AlertColor
};

const CustomAlert: React.FC<props> = ({message, type})  => {
    return(
        <Alert severity={type} sx={{margin:2, textAlign:'center'}}>{message}</Alert>
    );
}

export default CustomAlert;