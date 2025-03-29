
import PraiseModel from "../models/praiseModel";
import { createContext } from "react";


export default function praiseContext() {
    return createContext(new PraiseModel);
}