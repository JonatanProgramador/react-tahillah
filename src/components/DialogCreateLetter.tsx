import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import LetterInterface from "../interface/LetterInterface";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CustomSelect from "./CustomSelect";

interface props {
    open: boolean,
    setOpen: (value: boolean) => void,
    createLetter: (letter: LetterInterface) => void
}

const DialogCreateLetter: React.FC<props> = ({ open, setOpen, createLetter }) => {

    const valuesType = ["Estrofa", "Estribillo", "Pre-coro"];

    const formLetterSchema = Yup.object({
        type: Yup.string().required("Requerido").required("Requerido").oneOf(valuesType, "valor invalido"),
        letter: Yup.string().required("Requerido")
    });

    const formik = useFormik({
        validationSchema: formLetterSchema,
        initialValues: { type: "", letter: "" },
        onSubmit: value => {
            createLetter({ id: -1, type: value.type, letter: value.letter } as LetterInterface);
            formik.resetForm();
            setOpen(false);
        }
    })

    return (
        <Dialog onClose={() => setOpen(false)} open={open}>
            <Box onSubmit={formik.handleSubmit} component={"form"}>
                <DialogTitle align="center">Creado letra</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField helperText={formik.errors.letter} error={formik.errors.letter !== undefined} id="letter" name="letter" onChange={formik.handleChange} multiline rows={10} label="Letra" sx={{ width: '200px', backgroundColor: '#2C3E50', marginBottom: 1, marginTop: 1 }} color="secondary"></TextField>
                    <CustomSelect error={formik.errors.type !== undefined} helperText={formik.errors.type} id="type" label="Tipo" values={valuesType} disabled={false} defaultValue={undefined} value={formik.values.type??valuesType[0]} onChange={formik.handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button type="submit" >Crear</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export default DialogCreateLetter;