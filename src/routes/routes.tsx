
import { lazy, LazyExoticComponent, ReactElement } from "react";
import { JSX } from "@emotion/react/jsx-runtime";

interface AppRoute {
    id: number;
    name: string;
    path: string;
    url: string;
    menuBar: boolean;
    guard: boolean;
    element: LazyExoticComponent<() => JSX.Element>;
  }

const ROUTES:AppRoute[] = [
    {
        id: 1,
        name: "Home",
        url: "/",
        path: "/",
        menuBar:true,
        guard:false,
        element: lazy(() => import('../pages/ListThemePage'))
    },
    {
        id: 2,
        name: "Lista",
        url: "",
        path: "/praises/:type",
        menuBar:false,
        guard:false,
        element: lazy(() => import('../pages/ListPraise'))
    },
    {
        id: 3,
        name: "Ver alabanza",
        url: "",
        menuBar:false,
        path: "/showPraise/:id",
        guard:false,
        element: lazy(() => import('../pages/tabsPage'))
    },
    {
        id: 4,
        name: "Crear",
        url: "",
        menuBar:false,
        path: "/createPraise",
        guard:true,
        element: lazy(() => import('../pages/createPage'))
    },
    {
        id: 5,
        name: "Editar",
        url: "",
        menuBar:false,
        path: "/editPraise/:id",
        guard:true,
        element: lazy(() => import('../pages/editPage'))
    },
    {
        id: 6,
        name: "Login",
        url: "/login",
        menuBar:true,
        path: "/login",
        guard:false,
        element: lazy(() => import('../pages/loginPage'))
    },

    {
        id: 7,
        name: "Buscar",
        url: "/searchPraise",
        menuBar:true,
        path: "/searchPraise",
        guard:false,
        element: lazy(() => import('../pages/SearchPage'))
    }
];

export default ROUTES;