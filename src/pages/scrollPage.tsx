import { Box,  rgbToHex, Typography } from "@mui/material";
import DATA from "../data";

function ScrollPage() {
    const data = DATA[1];

    function getColor(type: string): string {
        switch (type) {
            case "estrofa":
                return rgbToHex("#FFEB3B");
            case "pre-coro":
                return rgbToHex("#FFEB3B");
            case "estribillo":
                return rgbToHex("#F5A623");
            default:
                return "white";
        }
    }
    return (<Box marginBottom={10}>
        <Box sx={{display:"flex"}}>
            <Typography sx={{ flexGrow: 1 }} fontSize={20}>{data.title}</Typography>
            <Typography fontSize={20}>{data.tone}</Typography>
        </Box>
        {data.letters.map((letter) => {
            return (<Box marginTop={10} key={letter.id}>
                <Typography color={getColor(letter.type)} fontSize={20}>{letter.letter}</Typography>
            </Box>);
        })}

    </Box>);
}

export default ScrollPage;