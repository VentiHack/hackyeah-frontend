import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.tsx";
import Animals from "./pages/animals.tsx";
import Root from "./pages/root.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <div> Error</div>,
        children: [
            { index: true, element: <Home /> },
            { path: "profile/:userId", element: <div>Profile</div> },
            { path: "animals", element: <Animals /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
