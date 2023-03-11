import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo_big.svg";
import { homeNavTabs } from "../../utils/constants";

const Navbar = () => {
   return (
      <nav className="p-4 flex items-center justify-between">
         <img src={Logo} className="w-auto h-auto" />
         <ul className="flex items-center gap-x-10">
            {homeNavTabs.map((tab) => (
               <li
                  key={tab.id}
                  className="text-sm font-semibold cursor-pointer"
               >
                  {tab.title}
               </li>
            ))}
         </ul>
         <Link to="/dashboard">
            <button className="bg-primary px-16 py-2 text-sm text-white">
               Signin
            </button>
         </Link>
      </nav>
   );
};

export default Navbar;
