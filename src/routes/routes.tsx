
import CreatePage from "../pages/createPage";
import EditPage from "../pages/editPage";
import ListPraise from "../pages/ListPraise";
import TabsPage from "../pages/tabsPage";

const ROUTES = [
    {
        id: 1,
        name: "Home",
        url: "/",
        path: "/",
        menuBar:true,
        element: <div></div>
    },
    {
        id: 2,
        name: "Lista",
        url: "/praise",
        path: "/praise",
        menuBar:true,
        element: <ListPraise/>
    },
    {
        id: 3,
        name: "Ver alabanza",
        url: "",
        menuBar:false,
        path: "/showPraise/:id",
        element: <TabsPage/>
    },
    {
        id: 4,
        name: "Crear",
        url: "",
        menuBar:false,
        path: "/createPraise",
        element: <CreatePage/>
    },
    {
        id: 4,
        name: "Editar",
        url: "",
        menuBar:false,
        path: "/editPraise/:id",
        element: <EditPage/>
    },
];

export default ROUTES;