import { Box, Button, Container, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DATA from "../data";
import AccordionPart from "../components/AccordionPart";


function CreatePage() {
    const data = DATA;

    return (
        <Container maxWidth={false}>
            <Box alignItems={'start'} display={'flex'}>
                <Box  display={'flex'} flexDirection={'column'}>
                    <Button sx={{width:'fit-content', height:'fit-content'}} variant="outlined" startIcon={<AddIcon />}>Crear</Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', alignItems:'end', flexGrow:1 }}>
                    <TextField disabled={true}  sx={{width:'200px', backgroundColor:'#2C3E50', marginBottom:1}}  color="secondary" label="Titulo" defaultValue={DATA[1].title}></TextField>
                    <TextField sx={{width:'200px', backgroundColor:'#2C3E50'}}  color="secondary" label="Tono" defaultValue={DATA[1].tone}></TextField>
                </Box>
            </Box>
            <Box marginTop={5}>
                {data[1].letters.map((letter) => {
                    return (<AccordionPart key={letter.id} letters={letter} />);
                })}
            </Box>
        </Container>
    );
}

export default CreatePage;