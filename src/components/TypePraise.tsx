import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

const types = [
    {
        name: "Júbilo",
        url: "jubilo"
    },
    {
        name: "Adoración",
        url: "adoracion"
    },
];

interface props {
    setType: (value:string) => void
};

const TypePraise: React.FC<props> = ({setType}) => {
    return (<Box>
        {types.map((value, index) => <Card key={index} sx={{ width: 120, marginBottom: 1 }}>
            <CardActionArea onClick={()=>{setType(value.url)}}>
                <CardContent>
                    <Typography textAlign={"center"} component={"h4"}>{value.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>)}
    </Box>);
}

export default TypePraise;
