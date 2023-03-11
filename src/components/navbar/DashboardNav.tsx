import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/demologo.svg";

const DashboardNav = () => {
   return (
      <nav className="p-4 flex items-center justify-between shadow-lg h-[10vh]">
         <Link to="/">
            <img src={Logo} className="w-auto h-auto" />
         </Link>

         <div className="flex items-center gap-4">
            <Link to="/dashboard">Soniez Group</Link>
            <span className="border-[1px] text-gray-600 h-[100%]"></span>
            <Link to="/dashboard">Sam Benny</Link>
         </div>
      </nav>
   );
};

export default DashboardNav;
