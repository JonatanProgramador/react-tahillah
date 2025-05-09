import { Box, CircularProgress } from "@mui/material";


const LoadingPage = () => {
    return (
        <Box display={"flex"} height={"80vh"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <CircularProgress size={100} />
        </Box>
    );
}

export default LoadingPage;