import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";


interface props {
    praise: PraiseInterface
}

const ShowPraise: React.FC<props> = ({ praise }) => {

    const [position, setPosition] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
    const [value, setValue] = useState(1);



    function touchStart(event: React.TouchEvent<HTMLDivElement>) {
        setPosition({ start: { x: event.touches[0].clientX, y: event.touches[0].clientY }, end: { x: 0, y: 0 } })
    }

    function touchMove(event: React.TouchEvent<HTMLDivElement>) {

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

    return (<Box>

        <TabContext value={value}>
            {praise?.letters.map((letter) => { return <TabPanel onTouchEnd={(event) => touchEnd(event)} onTouchMove={(event) => touchMove(event)} onTouchStart={(event) => touchStart(event)} sx={{ fontSize: 20, textAlign: "center", minHeight: "60vh" }} key={letter.id} value={letter.id}>{letter.letter}</TabPanel> })}
            <Tabs variant='scrollable' scrollButtons="auto" value={value} onChange={(event: React.SyntheticEvent, newValue: number) => setValue(newValue)}>
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

    </Box>);
}

export default ShowPraise;