import React, { useEffect, useState } from "react";
import { AlertColor, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";
import CustomAlert from "../components/CustomAlert";
import UserService from "../services/apirest/UserService";
import LoadingPage from "./LoadingPage";
import DialogConfirm from "../components/DialogConfirm";
import ShowPraise from "../components/ShowPraise";

function TabsPage() {

  const [praise, setPraise] = useState<PraiseInterface>();
  const [dialogConfirm, setDialogConfirm] = useState(false);
  const [sendData, setSendData] = useState<boolean | null>(null);
  const [alert, setAlert] = useState({ type: "", message: "", show: false });
  const [isLogin, setIsLogin] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ? params.id : "";

  useEffect(() => {
    (async () => {
      setPraise(await PraiseModel.getPraise(id));
      setIsLogin(await UserService.isLogin())
    })()
  }, []);



  function deletePraise() {
    (async () => {
      setSendData(true);
      const response = await PraiseModel.deletePraise(id);
      setAlert({ type: response ? "success" : "error", message: response ? "Se ha eliminado la alabanza" : "Error al eliminar la alabanza", show: true });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
        navigate("/");
      }, 3000);
      setPraise(undefined);
      setSendData(false);
    })()
  }



  return (praise && isLogin !== null ? <Box sx={{ overflow: "hidden" }} >
    {alert.show ? <CustomAlert message={alert.message} type={alert.type as AlertColor} /> : null}
    {isLogin ? <Box padding={1} justifyContent={"center"} display={"flex"}>
      <Button disabled={sendData || !isLogin} onClick={() => setDialogConfirm(true)} sx={{ marginRight: 1 }} variant="contained">Eliminar</Button>
      <Button disabled={sendData || !isLogin} href={"/editPraise/" + id} variant="contained">Editar</Button>
    </Box> : null}
    <ShowPraise praise={praise} />
    <DialogConfirm confirm={deletePraise} open={dialogConfirm} setOpen={setDialogConfirm} description={`¿Desea eliminar la alabanza "${praise.title.toLocaleUpperCase()}"?`} title="Eliminar alabanza" />
  </Box> : <LoadingPage />);


}

export default TabsPage;