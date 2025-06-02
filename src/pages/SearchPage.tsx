import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import PraiseModel from "../models/praiseModel";
import PraiseInterface from "../interface/PraiseInterface";
import CardPraise from "../components/CardPraise";
import LoadingPage from "./LoadingPage";
import PraiseSearch from "../components/PraiseSearch";


const SearchPage = () => {

    const [praises, setPraises] = useState<PraiseInterface[]>([]);
    const [sending, setSending] = useState(false);

    return (
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <PraiseSearch sending={sending} setPraises={setPraises} setSending={setSending}/>
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