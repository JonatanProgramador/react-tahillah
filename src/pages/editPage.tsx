import { Box, Button, Container, Divider, Grid2, TextField } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import LettersInterface from "../interface/LettersInterface";
import AccordionPart from "../components/AccordionPart";
import { useEffect, useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";
import DialogEditLetter from "../components/DialogEditLetter";
import LettersModel from "../models/lettersModel";
import DataInterface from "../interface/DataInterface";
import PraiseModel from "../models/praiseModel";
import { useParams } from "react-router-dom";



function EditPage() {

    const letterModel = new LettersModel();
    const params = useParams();
    let formik;

    const [praise, setPraise] = useState<DataInterface>();
    const [letters, setLetters] = useState<LettersInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LettersInterface>();

    useEffect(()=>{
        (async()=>{
            const praises =  await PraiseModel.getPraise(params.id?Number.parseInt(params.id):-1);
            setPraise(praises);
            setLetters(praises.letters);
        })()
    },[])

    useEffect(()=>{
      console.log(praise);
    },[praise])



    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
    });

     formik = useFormik({
        validationSchema: formPraiseSchema,
        initialValues: { title: praise?.title, tone: praise?.tone, type: praise?.type },
        onSubmit: values => {
            if (letters.length > 0) {
                console.log(values);
            }
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
praise?<Container sx={{ padding: 1 }} onSubmit={formik.handleSubmit} component={"form"} maxWidth={false}>
            <Grid2 spacing={1} container>
                <Grid2 size={6}>
                    <TextField defaultValue={praise.type} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Tipo" name="type" id="type"></TextField>
                </Grid2>
                <Grid2 display={"flex"} justifyContent={"end"} size={6} >
                    <TextField defaultValue={praise.title} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Titulo" name="title" id="title"></TextField>
                </Grid2>
                <Grid2 display={"flex"} flexDirection={"column"} justifyContent={"end"} size={6}>
                    <Button onClick={() => setOpenCreateDialog(true)} sx={{ width: 'fit-content', height: 'fit-content' }} variant="outlined">Crear Letra</Button>
                </Grid2>
                <Grid2 size={6} display={"flex"} justifyContent={"end"} >
                    <TextField defaultValue={praise.tone} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary"  label="Tono" id="tone" name="tone"></TextField>
                </Grid2>
            </Grid2>
            <Box marginTop={5}>
                <Divider sx={{ marginBottom: 1 }}>Letras</Divider>
                {letters.map((letter) => {
                    return (<AccordionPart setLetterEdit={setLetterEdit} key={letter.id} letters={letter} deleteLetter={deleteLetter} />);
                })}
            </Box>
            <Box marginTop={3}>
                <Button variant="outlined" type="submit">Editar</Button>
            </Box>
            <DialogCreateLetter open={openCreateDialog} setOpen={setOpenCreateDialog} createLetter={createLetter} />
            <DialogEditLetter open={openEditDialog} setOpen={setOpenEditDialog} editLetter={editLetter} letter={letterModify as LettersInterface} />
        </Container>:null

    );
}

export default EditPage;