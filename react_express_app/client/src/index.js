import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../src/auth/LogIn";
import SignUp from "../src/auth/SignUp";
import NotFoundPage from "./sections/NotFoundPage";
import Universities from "./sections/Universities";
import University from "./sections/University";
import Update from "./sections/Update";
import AddUniversity from "./sections/AddUniversity";
import { AuthProvider, UserProvider } from "./context/UserContext";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/Signin",
    element: <SignUp />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/universities",
    element: <Universities />,
  },
  {
    path: "universities/university/:id",
    element: <University />,
  },
  {
    path: "universities/university/:id/update/:id",
    element: <Update />,
  },
  {
    path: "universities/universities/add",
    element: <AddUniversity />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>
);
