
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
        name: "Lista Alabanzas",
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
];

export default ROUTES;