import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Root from "../pages/dashboard";
import NotFound from "../pages/404";
import Administration from "../pages/dashboard/administration";
import Onboard from "../pages/onboard";
import Signin from "../pages/onboard/Signin";
import Signup from "../pages/onboard/Signup";

const RoutesRenderer = () => {
   const [loggedIn, setLoggedIn] = useState(true);

   const routes = useRoutes([
      {
         path: "/",
         element: <Onboard />,
         errorElement: <NotFound />,
         children: [
            {
               path: "/",
               element: <Signup />
            },
            {
               path: "/signin",
               element: <Signin />
            },
         ]
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
