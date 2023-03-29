import React from "react";
import { Link } from "react-router-dom";
import { homeNavTabs } from "../../utils/constants";

const ResponsiveNav = () => {
   return (
      <nav className="md:w-[60vw] w-[100vw] h-[100%] bg-[rgba(0,0,0,0.9)] absolute top-0 right-0 z-40 flex flex-col ">
         <div className="h-[100vh] items-center justify-center flex flex-col">
            <ul className="flex flex-col gap-10 text-center ">
               {homeNavTabs.map((tab) => (
                  <li
                     key={tab.id}
                     className="text-white text-xl cursor-pointer"
                  >
                     {tab.title}
                  </li>
               ))}
            </ul>
            <button className="bg-primary px-16 py-2 text-sm text-white z-10 mt-10">
               Signin
            </button>
            <Link to="/dashboard" className="z-10 hidden lg:flex">
               <button className="bg-primary px-16 py-2 text-sm text-white z-10">
                  Signin
               </button>
            </Link>
         </div>
      </nav>
   );
};

export default ResponsiveNav;
