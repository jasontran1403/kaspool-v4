import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams, useRoutes } from 'react-router-dom';
import Error404 from "./pages/Error404";
import CommingSoon from "./pages/ComingSoon";
import Test from "./pages/Test";
import LandingPage4 from "./pages/LandingPage4";
import LandingPage4RefCode from "./pages/LandingPage4RefCode";
import Dashboard2 from "./pages/Dashboard2";
import Home from "./pages/Home";

export default function Router() {
    const locationRef = useLocation();

    // Extract the full path after "/"
    const fullPath = locationRef.pathname.slice(11); // Remove leading "/"
    // Check if the path matches "refcode=<actual-code>"
    const refcodeMatch = fullPath.match(/^refcode=(.+)$/);

    const refcode = refcodeMatch ? refcodeMatch[1] : null;
    // Initialize with the value from localStorage
    const [isConnectedToWallet, setIsConnectedToWallet] = useState(() => {
        return (
            localStorage.getItem("walletAddress") &&
            localStorage.getItem("publicKey") &&
            localStorage.getItem("walletStateInit") &&
            localStorage.getItem("is_in_tree") == "true"
        );
    });

    const isAdmin = window.location.href.includes("/admin");

    const routes = useRoutes([
        {
            path: "/",
            element: <LandingPage4 />
        },
        {
            path: "/:refcode",
            element: <LandingPage4RefCode />
        },
        {
            path: "/home",
            element: isConnectedToWallet ? <Home /> : <Navigate to="/" />
        },
        {
            path: "/admin/home/:id",
            element: isAdmin ? <Dashboard2 /> : <Navigate to="/" />
        },
        {
            path: '/test',
            element: <Home />
        },
        {
            path: '/404',
            element: <Error404 />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />
        },
    ]);

    return routes;
}
