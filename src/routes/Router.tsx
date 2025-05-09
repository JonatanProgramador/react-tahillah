import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes";
import Guard from "./Guard";
import React, { Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";



export default function Router() {

    return (<BrowserRouter>
    <Suspense fallback={<LoadingPage/>}>
        <Routes>
            {ROUTES.map((route)=>{
                if(route.guard) {
                    return <Route  key={route.id} path={route.path}  element={<Guard/>}><Route path="" element={<route.element/>}/></Route>;
                } else {
                    return <Route  key={route.id} path={route.path} element={<route.element/>}></Route>;
                }
            })}
        </Routes>
        </Suspense>
    </BrowserRouter>);
}