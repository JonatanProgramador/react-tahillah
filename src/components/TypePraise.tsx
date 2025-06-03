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

export default function TypePraise() {
    return (<Box>
        {types.map((value, index) => <Card key={index} sx={{ width: 120, marginBottom: 1 }}>
            <CardActionArea href={`praises/${value.url}`}>
                <CardContent>
                    <Typography textAlign={"center"} component={"h4"}>{value.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>)}
    </Box>);
}
