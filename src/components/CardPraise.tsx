import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PraiseInterface from "../interface/PraiseInterface";
import { useContext } from "react";
import { chooseContext } from "../contexts/ChoosePraiseContext";
import { useNavigate } from "react-router-dom";


interface props {
    praise: PraiseInterface,
    mode: string
};

const CardPraise: React.FC<props> = ({ praise, mode }) => {

    const context = useContext(chooseContext);
    const navigate = useNavigate();

    function setPraiseId() {
        mode === "show" ?
            navigate("/showPraise/" + praise._id)
            :
            context?.setChosePraise(praise._id)
            ;
    }

    return (
        <Card sx={{ width: 200, marginBottom: 1 }}>
            <CardActionArea onClick={() => setPraiseId()}>
                <CardContent>
                    <Typography color="primary" component={"h4"}>Titulo</Typography>
                    <Typography component={"h4"}>{praise.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardPraise;