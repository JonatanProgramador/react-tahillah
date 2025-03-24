import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollPage from "../pages/scrollPage";
import TabsPage from "../pages/tabsPage";
import CreatePage from "../pages/createPage";

export default function Router() {
    return ( <BrowserRouter>
        <Routes>
        <Route path='/' element={<div></div>}></Route>
            <Route path='/scroll' element={<ScrollPage/>}></Route>
            <Route path='/tabs' element={<TabsPage/>}></Route>
            <Route path='/accordion' element={<CreatePage/>}></Route>
        </Routes>
        </BrowserRouter>);
}