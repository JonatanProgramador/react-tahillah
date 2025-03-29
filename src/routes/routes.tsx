
import CreatePage from "../pages/createPage";
import ListPraise from "../pages/ListPraise";
import TabsPage from "../pages/tabsPage";

const ROUTES = [
    {
        id: 1,
        name: "Home",
        url: "/",
        path: "/",
        element: <div></div>
    },
    {
        id: 2,
        name: "Lista",
        url: "/praise",
        path: "/praise",
        element: <ListPraise/>
    },
    {
        id: 3,
        name: "Ver alabanza",
        url: "",
        path: "/showPraise/:id",
        element: <TabsPage/>
    },
    {
        id: 4,
        name: "Crear",
        url: "",
        path: "/createPraise",
        element: <CreatePage/>
    },
];

export default ROUTES;