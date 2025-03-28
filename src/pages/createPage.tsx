import { Box, Button, Container, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import {  useFormik } from "formik";
import LettersInterface from "../interface/LettersInterface";
import AccordionPart from "../components/AccordionPart";
import { useEffect, useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";
import DialogEditLetter from "../components/DialogEditLetter";



function CreatePage() {
    
    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20,"Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20,"Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20,"Maximo 20 caracteres"),
    });

    const [letters, setLetters] = useState<LettersInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LettersInterface>();

    //useEffect(()=>{console.log(letters),[letters]});

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

  function deleteLetter(id:number) {
    const newLetters = letters.filter((letter) => letter.id !== id);
    for(let i = 0; i<newLetters.length; ++i) {
        newLetters[i].id = i+1;
    }
        setLetters([...newLetters]);
  };

  function editLetter(letter:LettersInterface){
    console.log(letter);
  }

  function setLetterEdit(id:number) {
     const letter = letters.find((letter)=>letter.id === id);
     
     if(letter) {
        setLetterModify(letter);
        setOpenEditDialog(true);
     }
  }


    return (
        
        <Container onSubmit={formik.handleSubmit} component={"form"} maxWidth={false}>
            <Box alignItems={'start'} display={'flex'}>
                <Box  display={'flex'} flexDirection={'column'}>
                    <Button onClick={()=>setOpenCreateDialog(true)} sx={{width:'fit-content', height:'fit-content'}} variant="outlined" startIcon={<AddIcon />}>Crear</Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', alignItems:'end', flexGrow:1 }}>
                    <TextField disabled={true}  sx={{width:'200px', backgroundColor:'#2C3E50', marginBottom:1}}  color="secondary" label="Titulo" name="title"></TextField>
                    <TextField onChange={formik.handleChange} sx={{width:'200px', backgroundColor:'#2C3E50'}}  color="secondary" value={formik.values.tone} label="Tono" id="tone" name="tone"></TextField>
                </Box>
            </Box>
             <Box marginTop={5}>
                {letters.map((letter) => {
                    return (<AccordionPart setLetterEdit={setLetterEdit} key={letter.id} letters={letter} deleteLetter={deleteLetter} />);
                })}
            </Box> 
            <Button  type="submit">Enviar</Button>
            <DialogCreateLetter open={openCreateDialog} setOpen={setOpenCreateDialog} createLetter={createLetter}/>
            <DialogEditLetter open={openEditDialog} setOpen={setOpenEditDialog} editLetter={editLetter} letter={letterModify as LettersInterface}/>
        </Container>
        
    );
}

export default CreatePage;