import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import LetterInterface from "../interface/LetterInterface";
import * as Yup from 'yup';
import { useFormik } from "formik";

interface props {
    open: boolean,
    setOpen: (value: boolean) => void,
    createLetter: (letter:LetterInterface) => void
}

const DialogCreateLetter: React.FC<props> = ({ open, setOpen, createLetter }) => {
const formLetterSchema = Yup.object({
    type: Yup.string().required("Requerido"),
    letter: Yup.string().required("Requerido")
});
const formik =  useFormik({
    validationSchema: formLetterSchema,
    initialValues: {type:"", letter:""},
    onSubmit: value => {
        createLetter({id:-1, type:value.type, letter:value.letter} as LetterInterface);
        formik.resetForm();
        setOpen(false);
    }
})

    return (
        <Dialog onClose={() => setOpen(false)} open={open}>
            <Box onSubmit={formik.handleSubmit} component={"form"}>
            <DialogTitle align="center">Creado letra</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                <TextField helperText={formik.errors.type} error={formik.errors.type !== undefined} id="type" name="type" onChange={formik.handleChange} label="Tipo" sx={{ width: '200px', backgroundColor: '#2C3E50', marginBottom: 1, marginTop: 1 }} color="secondary"></TextField>
                <TextField helperText={formik.errors.letter} error={formik.errors.letter !== undefined} id="letter" name="letter" onChange={formik.handleChange} multiline rows={10} label="Letra" sx={{ width: '200px', backgroundColor: '#2C3E50', marginBottom: 1, marginTop: 1 }} color="secondary"></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setOpen(false)}>Cancelar</Button>
                <Button type="submit" >Crear</Button>
            </DialogActions>
            </Box>
        </Dialog>
    );
}

export default DialogCreateLetter;