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
import CustomSelect from "../components/CustomSelect";
import LoadingPage from "./LoadingPage";

function CreatePage() {

    const [letters, setLetters] = useState<LetterInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LetterInterface>();
    const [sendData, setSendData] = useState(false);
    const [alert, setAlert] = useState({type:"",message:"", show:false});

    const navigate = useNavigate();

    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(40, "Maximo 40 caracteres"),
        tone: Yup.string().max(40, "Maximo 40 caracteres"),
        type: Yup.string().required("Campo requerido").oneOf(["Júbilo", "Adoración"], "valor invalido"),
        author: Yup.string().max(40, "Maximo 40 caracteres"),
        track: Yup.string().max(100, "Maximo 100 caracteres"),
    });

    const formik = useFormik({
        validationSchema: formPraiseSchema,
        initialValues: { title: "", tone: "", type: "", author:"", track:"" },
        onSubmit: values => {
            if (letters.length > 0) {
                 (async () => {
                    setSendData(true);
                    const praise: PraiseInterface = { ...values, letters: letters } as PraiseInterface;
                    const response = await PraiseModel.createPraise(praise);
                    setAlert({type:response?"success":"error", message:response?"Se ha creado una alabanza":"Error al crear la alabanza", show:true});
                    setTimeout(()=>{
                        setAlert({...alert, show:false});
                        navigate("/");
                        setSendData(false);
                    },3000);
                    formik.resetForm();
                    setLetters([]);
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
        !sendData?
        <Container sx={{ padding: 1 }} onSubmit={formik.handleSubmit} component={"form"} maxWidth={false}>
            {alert.show?<CustomAlert message={alert.message} type={alert.type as AlertColor}/>:null}
            <Grid2 spacing={1} container>
                <Grid2 size={6}>
                    <CustomSelect error={formik.errors.type !== undefined} helperText={formik.errors.type} id="type" label="Tipo" values={["Júbilo", "Adoración"]} disabled={sendData} defaultValue={undefined} value={formik.values.type} onChange={formik.handleChange}/>
                </Grid2>
                <Grid2 display={"flex"} justifyContent={"end"} size={6} >
                    <TextField slotProps={{input:{style:{backgroundColor:'#2C3E50'}}}} error={formik.errors.title !== undefined} helperText={formik.errors.title} value={formik.values.title} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px' }} color="secondary" label="Titulo" name="title" id="title"></TextField>
                </Grid2>
                <Grid2 size={6} display={"flex"}>
                    <TextField slotProps={{input:{style:{backgroundColor:'#2C3E50'}}}} error={formik.errors.author !== undefined} helperText={formik.errors.author} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px' }} color="secondary" value={formik.values.author} label="Autor" id="author" name="author"></TextField>
                </Grid2>
                <Grid2 size={6} display={"flex"} justifyContent={"end"} >
                    <TextField slotProps={{input:{style:{backgroundColor:'#2C3E50'}}}} error={formik.errors.tone !== undefined} helperText={formik.errors.tone} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px'}}  color="secondary" value={formik.values.tone} label="Tono" id="tone" name="tone"></TextField>
                </Grid2>
                <Grid2 display={"flex"} flexDirection={"column"} justifyContent={"end"} size={6}>
                    <Button disabled={sendData} onClick={() => setOpenCreateDialog(true)} sx={{ width: 'fit-content', height: 'fit-content' }} variant="outlined">Crear Letra</Button>
                </Grid2>
                <Grid2 size={6} display={"flex"} justifyContent={"end"} >
                    <TextField slotProps={{input:{style:{backgroundColor:'#2C3E50'}}}} error={formik.errors.track !== undefined} helperText={formik.errors.track} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" value={formik.values.track} label="Original" id="track" name="track"></TextField>
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
    :<LoadingPage/>);
}

export default CreatePage;