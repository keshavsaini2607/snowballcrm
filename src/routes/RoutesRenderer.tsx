import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useRoutes } from "react-router-dom";
import Root from "../pages/dashboard";
import NotFound from "../pages/404";
import Administration from "../pages/dashboard/administration";
import Onboard from "../pages/onboard";
import Signin from "../pages/onboard/Signin";
import Signup from "../pages/onboard/Signup";
import Leads from "../pages/dashboard/leads";

const RoutesRenderer = () => {
   const [loggedIn, setLoggedIn] = useState(true);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if(location.pathname === "/dashboard") {
         navigate("/dashboard/leads");
      }
   }, [location])

   const routes = useRoutes([
      
      {
         path: "/",
         element: <Onboard />,
         children: [
            {
               path: "/",
               element: <Signup />,
            },
            {
               path: "/signin",
               element: <Signin />,
            },
         ],
      },
      {
         path: "/dashboard",
         element: loggedIn ? <Root /> : <Navigate to="/" />,
         children: [
            {
               path: "/dashboard/leads",
               element: <Leads />,
            },
            {
               path: "/dashboard/administration",
               element: <Administration />,
            },
         ],
      },
      {
         path: "*",
         element: <NotFound />,
      },
   ]);

   return routes;
};

export default RoutesRenderer;
