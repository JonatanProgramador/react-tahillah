import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import PraiseModel from "../models/praiseModel";
import PraiseInterface from "../interface/PraiseInterface";
import CardPraise from "../components/CardPraise";
import LoadingPage from "./LoadingPage";


const SearchPage = () => {

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

    const [sending, setSending] = useState(false);
    const [praises, setPraises] = useState<PraiseInterface[]>([]);

    return (
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Box component={"form"} onSubmit={formik.handleSubmit}>
                <TextField size="small" disabled={sending} onChange={formik.handleChange} slotProps={{ inputLabel: { style: { color: "white" } } }} sx={{ width: '150px', backgroundColor: '#2C3E50', marginRight: 1 }} color="secondary" label="Titulo" name="title" id="title" />
                <Button disabled={sending} type="submit" variant="contained">Buscar</Button>
            </Box>
            {sending ? <LoadingPage /> :
                <Box marginTop={1} display={'flex'} flexDirection={"column"} alignItems={'center'} >
                    {praises?.map((praise) => {
                        return <CardPraise key={praise._id} praise={praise} />
                    })}
                </Box>}

        </Box>


    );
}

export default SearchPage;