import { AlertColor, Box, Button, Container, Divider, Grid2, TextField } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import LetterInterface from "../interface/LetterInterface";
import AccordionPart from "../components/AccordionPart";
import { useEffect, useState } from "react";
import DialogCreateLetter from "../components/DialogCreateLetter";
import DialogEditLetter from "../components/DialogEditLetter";
import LettersModel from "../models/lettersModel";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";
import { useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";



function EditPage() {



    const [praise, setPraise] = useState<PraiseInterface>();
    const [letters, setLetters] = useState<LetterInterface[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [letterModify, setLetterModify] = useState<LetterInterface>();
    const [sendData, setSendData] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "", show: false });

    const navigate = useNavigate();

    const formPraiseSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        tone: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
        type: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
    });

    const params = useParams();
    let formik = useFormik({
        validationSchema: formPraiseSchema,
        initialValues: { title: "", tone: "", type: "" },
        onSubmit: values => {
            (async () => {
                if (letters.length > 0 && praise) {
                    setSendData(true);
                    const response = await PraiseModel.updatePraise({ ...praise, ...values, letters: letters });
                    setAlert({type:response?"success":"error", message:response?"Se ha actualizado la alabanza":"Error al actualizar la alabanza", show:true});
                    setTimeout(()=>{
                        setAlert({...alert, show:false});
                        navigate("/praise");
                    },3000);
                    setSendData(false);
                }
            })()
        }
    });

    useEffect(() => {
        (async () => {
            const praises = await PraiseModel.getPraise(params.id ? params.id : "");
            setPraise(praises);
            setLetters(praises.letters);
        })()
    }, [])

    useEffect(() => {
        formik.values.title = praise?.title ?? "";
        formik.values.tone = praise?.tone ?? "";
        formik.values.type = praise?.type ?? "";
    }, [praise])


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
        praise ? <Container sx={{ padding: 1 }} onSubmit={formik.handleSubmit} component={"form"} maxWidth={false}>
            {alert.show?<CustomAlert message={alert.message} type={alert.type as AlertColor}/>:null}
            <Grid2 spacing={1} container>
                <Grid2 size={6}>
                    <TextField defaultValue={praise.type} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Tipo" name="type" id="type"></TextField>
                </Grid2>
                <Grid2 display={"flex"} justifyContent={"end"} size={6} >
                    <TextField defaultValue={praise.title} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Titulo" name="title" id="title"></TextField>
                </Grid2>
                <Grid2 display={"flex"} flexDirection={"column"} justifyContent={"end"} size={6}>
                    <Button disabled={sendData} onClick={() => setOpenCreateDialog(true)} sx={{ width: 'fit-content', height: 'fit-content' }} variant="outlined">Crear Letra</Button>
                </Grid2>
                <Grid2 size={6} display={"flex"} justifyContent={"end"} >
                    <TextField defaultValue={praise.tone} disabled={sendData} onChange={formik.handleChange} sx={{ width: '150px', backgroundColor: '#2C3E50' }} color="secondary" label="Tono" id="tone" name="tone"></TextField>
                </Grid2>
            </Grid2>
            <Box marginTop={5}>
                <Divider sx={{ marginBottom: 1 }}>Letras</Divider>
                {letters.map((letter) => {
                    return (<AccordionPart setLetterEdit={setLetterEdit} key={letter.id} letters={letter} deleteLetter={deleteLetter} />);
                })}
            </Box>
            <Box marginTop={3}>
                <Button disabled={sendData} variant="outlined" type="submit">Editar</Button>
            </Box>
            <DialogCreateLetter open={openCreateDialog} setOpen={setOpenCreateDialog} createLetter={createLetter} />
            <DialogEditLetter open={openEditDialog} setOpen={setOpenEditDialog} editLetter={editLetter} letter={letterModify as LetterInterface} />
        </Container> : null

    );
}

export default EditPage;