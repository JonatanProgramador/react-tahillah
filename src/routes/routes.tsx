
import { lazy, LazyExoticComponent, ReactElement } from "react";
import { JSX } from "@emotion/react/jsx-runtime";

interface AppRoute {
    id: number;
    name: string;
    path: string;
    url: string;
    menuBar: boolean;
    securityLevel: number;
    element: LazyExoticComponent<() => JSX.Element>;
}

const ROUTES: AppRoute[] = [
    {
        id: 1,
        name: "Home",
        url: "/",
        path: "/",
        menuBar: true,
        securityLevel: 0,
        element: lazy(() => import('../pages/ListThemePage'))
    },
    {
        id: 3,
        name: "Ver alabanza",
        url: "",
        menuBar: false,
        path: "/showPraise/:id",
        securityLevel: 0,
        element: lazy(() => import('../pages/tabsPage'))
    },
    {
        id: 4,
        name: "Crear",
        url: "",
        menuBar: false,
        path: "/createPraise",
        securityLevel: 1,
        element: lazy(() => import('../pages/createPage'))
    },
    {
        id: 5,
        name: "Editar",
        url: "",
        menuBar: false,
        path: "/editPraise/:id",
        securityLevel: 1,
        element: lazy(() => import('../pages/editPage'))
    },
    {
        id: 6,
        name: "Login",
        url: "/login",
        menuBar: true,
        path: "/login",
        securityLevel: 0,
        element: lazy(() => import('../pages/loginPage'))
    },

    {
        id: 7,
        name: "Buscar",
        url: "/searchPraise",
        menuBar: true,
        path: "/searchPraise",
        securityLevel: 0,
        element: lazy(() => import('../pages/SearchPage'))
    },
    {
        id: 8,
        name: "Sesión",
        url: "/sesion",
        menuBar: true,
        path: "/sesion",
        securityLevel: 2,
        element: lazy(() => import('../pages/SesionPage'))
    }
];

export default ROUTES;