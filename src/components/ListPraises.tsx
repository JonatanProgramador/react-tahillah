import { useEffect, useState } from "react";
import PraiseInterface from "../interface/PraiseInterface";
import CardPraise from "./CardPraise";
import PraiseModel from "../models/praiseModel";

interface props {
    type: string,
    mode: string
};

const ListPraises: React.FC<props> = ({ type, mode }) => {

    const [praises, setPraises] = useState<PraiseInterface[]>();

    useEffect(() => {
        (async () => {
            setPraises(await PraiseModel.searchPraise("type", type === "jubilo" ? "Júbilo" : "Adoración", true));
        })()
    }, []);

    return (praises?.map((praise) => {
        return <CardPraise mode={mode} key={praise._id} praise={praise} />
    }));
}

export default ListPraises;