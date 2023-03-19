import { useEffect, useState } from "react";
import {
   Navigate,
   useLocation,
   useNavigate,
   useRoutes,
} from "react-router-dom";
import Root from "../pages/dashboard";
import NotFound from "../pages/404";
import Administration from "../pages/dashboard/administration";
import Onboard from "../pages/onboard";
import Signin from "../pages/onboard/Signin";
import Signup from "../pages/onboard/Signup";
import Leads from "../pages/dashboard/leads";

const RoutesRenderer = () => {
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      if (location.pathname === "/dashboard") {
         navigate("/dashboard/leads");
      }
   }, [location]);

   const isAuthenticated = () => {
      const token = localStorage.getItem("access_token");
      return token !== null;
   };

   const PrivateRoute = ({ element }: any) => {
      return isAuthenticated() ? element : <Navigate to="/signin" replace />;
   };

   const AuthRoute = ({ element }: any) => {
      return isAuthenticated() ? <Navigate to="/dashboard" replace /> : element;
   };

   const routes = useRoutes([
      {
         path: "/",
         element: <AuthRoute element={<Onboard />} />,
         children: [
            {
               path: "/",
               element: <Signup />,
            },
            {
               path: "/email-verify",
               element: <Signup />,
               children: [
                  {
                     path: ":token:rtoken",
                     element: <Signup />,
                  },
               ],
            },
            {
               path: "/signin",
               element: <Signin />,
            },
         ],
      },
      {
         path: "/dashboard",
         element: <PrivateRoute element={<Root />} />,
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
