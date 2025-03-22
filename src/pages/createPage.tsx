import {  Box, Button, Container, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DATA from "../data";
import AccordionPart from "../components/AccordionPart";


function CreatePage() {
const data = DATA;

    return (
        <Container maxWidth={false}>
            <Box sx={{display:"flex"}}>
            <Typography sx={{ flexGrow: 1 }} fontSize={20}>{DATA[1].title}</Typography>
            <Typography fontSize={20}>{DATA[1].tone}</Typography>
        </Box>
            <Box display="flex" marginTop={5}>
                <Button sx={{ backgroundColor: "white" }} variant="outlined" startIcon={<AddIcon />}>Crear</Button>
            </Box>
            <Box marginTop={5}>
                {data[1].letters.map((letter)=>{
                    return (<AccordionPart key={letter.id} letters={letter}/>);
                })}
            </Box>
        </Container>
    );
}

export default CreatePage;