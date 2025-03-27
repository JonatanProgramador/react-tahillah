import { Box, Button, Container, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import {  useFormik } from "formik";
import LettersInterface from "../interface/LettersInterface";
import AccordionPart from "../components/AccordionPart";
import { useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";



function CreatePage() {
    
    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20,"Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20,"Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20,"Maximo 20 caracteres"),
    });

    const [letters, setLetters] = useState<LettersInterface[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const formik = useFormik({
        validationSchema:formPraiseSchema,
        initialValues:{id: -1, title:"", tone:"", type:""},
        onSubmit: values => {
            console.log(values);
        }
    });

  function createLetter(letter:LettersInterface) {
    letter.id = letters.length+1;
    const arraySummary = letter.letter.split(" ");
    letter.summary = "";
    for(let i=0; i<5&&i<arraySummary.length; ++i) {
        letter.summary = letter.summary+arraySummary[i]+" ";
    }
    setLetters([...letters, letter]);
  }


    return (
        
        <Container onSubmit={formik.handleSubmit} component={"form"} maxWidth={false}>
            <Box alignItems={'start'} display={'flex'}>
                <Box  display={'flex'} flexDirection={'column'}>
                    <Button onClick={()=>setOpenDialog(true)} sx={{width:'fit-content', height:'fit-content'}} variant="outlined" startIcon={<AddIcon />}>Crear</Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', alignItems:'end', flexGrow:1 }}>
                    <TextField disabled={true}  sx={{width:'200px', backgroundColor:'#2C3E50', marginBottom:1}}  color="secondary" label="Titulo" name="title"></TextField>
                    <TextField onChange={formik.handleChange} sx={{width:'200px', backgroundColor:'#2C3E50'}}  color="secondary" value={formik.values.tone} label="Tono" id="tone" name="tone"></TextField>
                </Box>
            </Box>
             <Box marginTop={5}>
                {letters.map((letter) => {
                    return (<AccordionPart key={letter.id} letters={letter} />);
                })}
            </Box> 
            <Button  type="submit">Enviar</Button>
            <DialogCreateLetter open={openDialog} setOpen={setOpenDialog} createLetter={createLetter}/>
        </Container>
        
    );
}

export default CreatePage;