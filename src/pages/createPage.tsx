import { Box, Button, Container, Divider, Grid2, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { useFormik } from "formik";
import LettersInterface from "../interface/LettersInterface";
import AccordionPart from "../components/AccordionPart";
import { useEffect, useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";
import DialogEditLetter from "../components/DialogEditLetter";
import LettersModel from "../models/lettersModel";
import DataInterface from "../interface/DataInterface";



function CreatePage() {

    const [letters, setLetters] = useState<LettersInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LettersInterface>();

    const letterModel = new LettersModel();

    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
    });

    const formik = useFormik({
        validationSchema: formPraiseSchema,
        initialValues: { title: "", tone: "", type: "" },
        onSubmit: values => {
            const praise:DataInterface = {...values, letters:letters} as DataInterface;
            console.log(praise);
        }
    });

    function createLetter(letter: LettersInterface) {
        letterModel.createLetter(letter);
        setLetters([...letterModel.getLetters()]);
    };

    function deleteLetter(id: number) {
        letterModel.deleteLetter(id);
        setLetters([...letterModel.getLetters()]);
    };

    function editLetter(letter: LettersInterface) {
        letterModel.editLetter(letter);
        setLetters([...letterModel.getLetters()]);
    };

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
            <Button variant="outlined" type="submit">Enviar</Button>
            <DialogCreateLetter open={openCreateDialog} setOpen={setOpenCreateDialog} createLetter={createLetter} />
            <DialogEditLetter open={openEditDialog} setOpen={setOpenEditDialog} editLetter={editLetter} letter={letterModify as LettersInterface} />
        </Container>

    );
}

export default CreatePage;