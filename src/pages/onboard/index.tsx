import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation, useNavigation } from "react-router-dom";
import { demo } from "../../api/auth";
import Navbar from "../../components/navbar";

const Onboard = () => {
   const location = useLocation();
   console.log(location);
   const { isError, error, isLoading, data } = useQuery("posts", demo, {
      staleTime: 6000,
   });

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (isError && error) {
      return <h1>{`${error}`}</h1>;
   }

   return (
      <div>
         <Navbar />
         <div className="flex items-start justify-between px-10 py-20">
            <div className="w-[45%]">
               <h1 className="text-5xl mb-5 font-extrabold">
                  Business-centric CRM to{" "}
                  <span className="text-primary">elevate opportunity</span>
               </h1>
               <p>
                  With <span className="font-extrabold">Snowball CRM</span>, you
                  can migrate your business to digital platform and manage your
                  customer relationships more easily. Whether you're ready to
                  move beyond spreadsheets or simply replace legacy sales tools,
                  we are here to help you get started.
               </p>
            </div>
            <div className="flex flex-col items-start w-[30%] gap-3">
               <h4 className="text-xl font-bold">
                  Get started with our user-friendly platform for awesome
                  customer relationship.
               </h4>
               {location.pathname !== "/signin" ? (
                  <p>
                     Already with SnowBall;{"  "}
                     <Link to="/signin">
                        <span className="underline text-blue-800 cursor-pointer">
                           Sign In{" "}
                        </span>
                     </Link>
                     here
                  </p>
               ) : (
                  <p>
                     New to SnowBall;{"  "}
                     <Link to="/">
                        <span className="underline text-blue-800 cursor-pointer">
                           Sign Up{" "}
                        </span>
                     </Link>
                     here
                  </p>
               )}

               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default Onboard;
