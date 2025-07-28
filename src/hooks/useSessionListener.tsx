import React from "react";
import { io } from "socket.io-client";
import PraiseInterface from "../interface/PraiseInterface";
import PraiseModel from "../models/praiseModel";


export default function useSessionListerner() {

    const socket = io(import.meta.env.VITE_URL_SERVER);

    function on(idSession: string, setPraise: React.Dispatch<React.SetStateAction<PraiseInterface | undefined>>) {
        socket.on(idSession, (change) => {
            (async () => { setPraise(await PraiseModel.getPraise(change)); })()
        });
    }

    function disconnect() {
        socket.disconnect();
    }

    return { on, disconnect };
}