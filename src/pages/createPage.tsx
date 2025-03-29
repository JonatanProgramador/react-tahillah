import { Box, Button, Container, Divider, Grid2, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { useFormik } from "formik";
import LettersInterface from "../interface/LettersInterface";
import AccordionPart from "../components/AccordionPart";
import { useEffect, useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";
import DialogEditLetter from "../components/DialogEditLetter";



function CreatePage() {

    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
    });

    const [letters, setLetters] = useState<LettersInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LettersInterface>();

    //useEffect(()=>{console.log(letters),[letters]});

    const formik = useFormik({
        validationSchema: formPraiseSchema,
        initialValues: { title: "", tone: "", type: "" },
        onSubmit: values => {
            console.log(values);
        }
    });

    function createLetter(letter: LettersInterface) {
        letter.id = letters.length + 1;
        const arraySummary = letter.letter.split(" ");
        letter.summary = "";
        for (let i = 0; i < 5 && i < arraySummary.length; ++i) {
            letter.summary = letter.summary + arraySummary[i] + " ";
        }
        setLetters([...letters, letter]);
    }

    function deleteLetter(id: number) {
        const newLetters = letters.filter((letter) => letter.id !== id);
        for (let i = 0; i < newLetters.length; ++i) {
            newLetters[i].id = i + 1;
        }
        setLetters([...newLetters]);
    };

    function editLetter(letter: LettersInterface) {
        letter.summary = "";
        const arraySummary = letter.letter.split(" ");
        for (let i = 0; i < 5 && i < arraySummary.length; ++i) {
            letter.summary = letter.summary + arraySummary[i] + " ";
        }
        const newLetters = letters.map((le) => le.id === letter.id ? letter : le);
        setLetters([...newLetters]);
    }

    function setLetterEdit(id: number) {
        const letter = letters.find((letter) => letter.id === id);

        if (letter) {
            setLetterModify(letter);
            setOpenEditDialog(true);
        }
    }


    return (

        <Container sx={{ padding: 1 }} onSubmit={formik.handleSubmit} component={"form"} maxWidth={false}>
            <Grid2 spacing={1} container>
                <Grid2 size={6}>
                    <TextField onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Tipo" name="type" id="type"></TextField>
                </Grid2>
                <Grid2 display={"flex"} justifyContent={"end"} size={6} >
                    <TextField onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Titulo" name="title" id="title"></TextField>
                </Grid2>
                <Grid2 display={"flex"} flexDirection={"column"} justifyContent={"end"} size={6}>
                    <Button onClick={() => setOpenCreateDialog(true)} sx={{ width: 'fit-content', height: 'fit-content' }} variant="outlined">Crear Letra</Button>
                </Grid2>
                <Grid2 size={6} display={"flex"} justifyContent={"end"} >
                    <TextField onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" value={formik.values.tone} label="Tono" id="tone" name="tone"></TextField>
                </Grid2>
            </Grid2>
            <Box marginTop={5}>
                <Divider>Letras</Divider>
                {letters.map((letter) => {
                    return (<AccordionPart setLetterEdit={setLetterEdit} key={letter.id} letters={letter} deleteLetter={deleteLetter} />);
                })}
            </Box>
            <Button type="submit">Enviar</Button>
            <DialogCreateLetter open={openCreateDialog} setOpen={setOpenCreateDialog} createLetter={createLetter} />
            <DialogEditLetter open={openEditDialog} setOpen={setOpenEditDialog} editLetter={editLetter} letter={letterModify as LettersInterface} />
        </Container>

    );
}

export default CreatePage;