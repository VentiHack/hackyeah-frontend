import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.tsx";
import Animals from "./pages/animals.tsx";
import Map from "./pages/map.tsx";
import Root from "./pages/root.tsx";
import SubmitForm from "./pages/submitForm.tsx";
import Profile from "./pages/profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div> Error</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "mapa", element: <Map /> },
      { path: "profil", element: <Profile /> },
      { path: "zwierzeta", element: <Animals /> },
      { path: "reportowanie", element: <SubmitForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
