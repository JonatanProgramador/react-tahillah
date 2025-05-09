import { Box, Typography } from "@mui/material";
import DATA from "../data";

function ScrollPage() {
    const data = DATA[1];

   
    return (<Box paddingLeft={1} paddingRight={1} marginBottom={10}>
        <Box sx={{display:"flex"}}>
            <Typography sx={{ flexGrow: 1 }} fontSize={20}>{data.title}</Typography>
            <Typography fontSize={20}>{data.tone}</Typography>
        </Box>
        {data.letters.map((letter) => {
            return (<Box marginTop={10} key={letter.id}>
                <Typography fontSize={20}>{letter.letter}</Typography>
            </Box>);
        })}

    </Box>);
}

export default ScrollPage;