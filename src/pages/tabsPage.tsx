import React, { useEffect, useState } from "react";
import { AlertColor, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";
import CustomAlert from "../components/CustomAlert";
import UserService from "../services/apirest/UserService";
import LoadingPage from "./LoadingPage";

function TabsPage() {

  const [value, setValue] = useState(1);
  const [praise, setPraise] = useState<PraiseInterface>();
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


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.isTrusted;
    setValue(newValue);
  };

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

  const [position, setPosition] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });

  function touchStart(event: React.TouchEvent<HTMLDivElement>) {
    setPosition({ start: { x: event.touches[0].clientX, y: event.touches[0].clientY }, end: { x: 0, y: 0 } })
  }

  function touchMove(event: React.TouchEvent<HTMLDivElement>) {
 
    const speed = 1;
    const x = event.touches[0].clientX - position.start.x;

    if (position.end.x < event.touches[0].clientX) {
      event.currentTarget.style.transform = "translateX(" + (x) + "px)";
    } else {
      event.currentTarget.style.transform = "translateX(" + (x) + "px)";
    }
 
    setPosition({ start: position.start, end: { x: event.touches[0].clientX, y: event.touches[0].clientY } })
  }

  function touchEnd(event: React.TouchEvent<HTMLDivElement>) {

    const trige = 50;

 
    if (position.end.x > 0) {
      event.currentTarget.style.transform = "translateX(" + 0 + "px)"
      if ((position.end.x - position.start.x) > trige) {
        if (praise) {
          setValue(value > 1 ? value - 1 : value);
        }
      }


      if ((position.start.x - position.end.x) > trige) {
        if (praise) {
          setValue(praise?.letters.length > value ? value + 1 : value);
        }
      }
    }

  }

  return (praise && isLogin !== null ? <Box sx={{ overflow: "hidden" }} >
    {alert.show ? <CustomAlert message={alert.message} type={alert.type as AlertColor} /> : null}
    {isLogin ? <Box padding={1} justifyContent={"center"} display={"flex"}>
      <Button disabled={sendData || !isLogin} onClick={() => deletePraise()} sx={{ marginRight: 1 }} variant="contained">Eliminar</Button>
      <Button disabled={sendData || !isLogin} href={"/editPraise/" + id} variant="contained">Editar</Button>
    </Box> : null}
    <TabContext value={value}>
      {praise?.letters.map((letter) => { return <TabPanel onTouchEnd={(event) => touchEnd(event)} onTouchMove={(event) => touchMove(event)} onTouchStart={(event) => touchStart(event)} sx={{ fontSize: 20, textAlign: "center", minHeight: "60vh" }} key={letter.id} value={letter.id}>{letter.letter}</TabPanel> })}
      <Tabs variant='scrollable' scrollButtons="auto" value={value} onChange={handleChange}>
        {praise?.letters.map((letter) => { return (<Tab key={letter.id} label={letter.summary} value={letter.id} />); })}
      </Tabs>
    </TabContext>

    <Box display="flex" margin={1}>
      <Box sx={{ flexGrow: 1, }} display={"flex"} flexDirection={"column"}>
        <Typography fontSize={20}>Titulo</Typography>
        <Typography color="textSecondary" >{praise?.title}</Typography>
      </Box>
      <Box>
        <Typography fontSize={20}>Tono</Typography>
        <Typography color="textSecondary" >{praise?.tone}</Typography>
      </Box>
    </Box>

  </Box> : <LoadingPage />);


}

export default TabsPage;