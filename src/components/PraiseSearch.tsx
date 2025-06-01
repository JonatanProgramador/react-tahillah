import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import PraiseModel from "../models/praiseModel";
import PraiseInterface from "../interface/PraiseInterface";

 
interface props {
    sending: boolean,
    setSending: (value:boolean) => void,
    setPraises: (value: PraiseInterface[]) => void,
}

const PraiseSearch: React.FC<props> = ({setPraises, sending, setSending }) => {

    

    const formSearchSchema = Yup.object({
        title: Yup.string().required("Campo requerido").max(20, "Maximo 20 caracteres"),
    });
    const formik = useFormik({
        validationSchema: formSearchSchema,
        initialValues: { title: "" },
        onSubmit: (values) => {
            (async () => {
             setSending(true);
                setPraises(await PraiseModel.searchPraise("title", values.title, false));
                setSending(false);
            })();
        }
    });

    return (
            <Box component={"form"} onSubmit={formik.handleSubmit}>
                <TextField size="small" disabled={sending} onChange={formik.handleChange} slotProps={{ inputLabel: { style: { color: "white" } } }} sx={{ width: '150px', backgroundColor: '#2C3E50', marginRight: 1 }} color="secondary" label="Titulo" name="title" id="title" />
                <Button disabled={sending} type="submit" variant="contained">Buscar</Button>
            </Box>);
}

export default PraiseSearch;