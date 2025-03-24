import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes";


export default function Router() {

    return (<BrowserRouter>
        <Routes>
            {ROUTES.map((route)=>{
                return <Route key={route.id} path={route.path} element={route.element}></Route>;
            })}
        </Routes>
    </BrowserRouter>);
}