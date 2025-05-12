import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PraiseInterface from "../interface/PraiseInterface";


interface props {
    praise: PraiseInterface
};

const CardPraise: React.FC<props> = ({ praise }) => {
    return (
        <Card sx={{ width: 200, marginBottom: 1 }}>
            <CardActionArea href={"/showPraise/" + praise._id}>
                <CardContent>
                    <Typography color="primary" component={"h4"}>Titulo</Typography>
                    <Typography component={"h4"}>{praise.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardPraise;