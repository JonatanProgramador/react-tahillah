import { AlertColor, Box, Button, Container, Divider, Grid2, TextField } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import LetterInterface from "../interface/LetterInterface";
import AccordionPart from "../components/AccordionPart";
import {  useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";
import DialogEditLetter from "../components/DialogEditLetter";
import LettersModel from "../models/lettersModel";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";
import CustomAlert from "../components/CustomAlert";
import { useNavigate } from "react-router-dom";

function CreatePage() {

    const [letters, setLetters] = useState<LetterInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LetterInterface>();
    const [sendData, setSendData] = useState(false);
    const [alert, setAlert] = useState({type:"",message:"", show:false});

    const navigate = useNavigate();

    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
    });

    const formik = useFormik({
        validationSchema: formPraiseSchema,
        initialValues: { title: "", tone: "", type: "" },
        onSubmit: values => {
            if (letters.length > 0) {
                (async () => {
                    setSendData(true);
                    const praise: PraiseInterface = { ...values, letters: letters } as PraiseInterface;
                    const response = await PraiseModel.createPraise(praise);
                    setAlert({type:response?"success":"error", message:response?"Se ha creado una alabanza":"Error al crear la alabanza", show:true});
                    setTimeout(()=>{
                        setAlert({...alert, show:false});
                        navigate("/praise");
                    },3000);
                    formik.resetForm();
                    setLetters([]);
                    setSendData(false);
                })()
            }
        }
    });

    function createLetter(letter: LetterInterface) {
        setLetters([...LettersModel.createLetter(letter, letters)]);
    };

    function deleteLetter(id: number) {
        setLetters([...LettersModel.deleteLetter(id, letters)]);
    };

    function editLetter(letter: LetterInterface) {
        setLetters([...LettersModel.editLetter(letter, letters)]);
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
            {alert.show?<CustomAlert message={alert.message} type={alert.type as AlertColor}/>:null}
            <Grid2 spacing={1} container>
                <Grid2 size={6}>
                    <TextField value={formik.values.type} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Tipo" name="type" id="type"></TextField>
                </Grid2>
                <Grid2 display={"flex"} justifyContent={"end"} size={6} >
                    <TextField value={formik.values.title} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Titulo" name="title" id="title"></TextField>
                </Grid2>
                <Grid2 display={"flex"} flexDirection={"column"} justifyContent={"end"} size={6}>
                    <Button disabled={sendData} onClick={() => setOpenCreateDialog(true)} sx={{ width: 'fit-content', height: 'fit-content' }} variant="outlined">Crear Letra</Button>
                </Grid2>
                <Grid2 size={6} display={"flex"} justifyContent={"end"} >
                    <TextField disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" value={formik.values.tone} label="Tono" id="tone" name="tone"></TextField>
                </Grid2>
            </Grid2>
            <Box marginTop={5}>
                <Divider>Letras</Divider>
                {letters.map((letter) => {
                    return (<AccordionPart setLetterEdit={setLetterEdit} key={letter.id} letters={letter} deleteLetter={deleteLetter} />);
                })}
            </Box>
            <Box margin={1}>
                <Button disabled={sendData} variant="outlined" type="submit">Crear</Button>
            </Box>
            <DialogCreateLetter open={openCreateDialog} setOpen={setOpenCreateDialog} createLetter={createLetter} />
            <DialogEditLetter open={openEditDialog} setOpen={setOpenEditDialog} editLetter={editLetter} letter={letterModify as LetterInterface} />
        </Container>

    );
}

export default CreatePage;