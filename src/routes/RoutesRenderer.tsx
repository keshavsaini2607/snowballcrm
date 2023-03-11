import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Root from ".";
import NotFound from "../pages/404";
import Administration from "../pages/dashboard/administration";
import Onboard from "../pages/onboard";

const RoutesRenderer = () => {
   const [loggedIn, setLoggedIn] = useState(true);

   const routes = useRoutes([
      {
         path: "/",
         element: <Onboard />,
         errorElement: <NotFound />,
      },
      {
         path: "/dashboard",
         element: loggedIn ? <Root /> : <Navigate to="/" />,
         children: [
            {
               path: "/dashboard/administration",
               element: <Administration />,
            },
         ],
      },
   ]);

   return routes;
};

export default RoutesRenderer;
