import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { homeNavTabs } from "../../utils/constants";
import { useWindowSize } from "../../utils/useWindowSize";
import ResponsiveNav from "./ResponsiveNav";

const Navbar = () => {
   const [selectedTab, setSelectedTab] = useState<string>("Sales CRM");
   const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
   const { width } = useWindowSize();

   return (
      <nav className="p-4 flex items-center justify-between z-10">
         <img src="/snowball_logo.svg" className="w-auto h-auto md:hidden" />
         <img src="/logo_big.svg" className="w-auto h-auto hidden md:block" />
         <ul className="items-center gap-x-10 hidden lg:flex">
            {homeNavTabs.map((tab) => (
               <li
                  key={tab.id}
                  className={`text-sm font-semibold cursor-pointer ${
                     selectedTab === tab.title
                        ? "border-b-4 border-b-secondary font-extrabold rounded-sm"
                        : "border-b-4 border-b-transparent"
                  }`}
                  onClick={() => setSelectedTab(tab?.title)}
               >
                  {tab.title}
               </li>
            ))}
         </ul>
         <Link to="/dashboard" className="z-10 hidden lg:flex">
            <button className="bg-primary px-16 py-2 text-sm text-white z-10">
               Sign in
            </button>
         </Link>
         {width < 1024 && showMobileMenu ? (
            <ResponsiveNav
               selectedTab={selectedTab}
               setSelectedTab={setSelectedTab}
               setShowMobileMenu={setShowMobileMenu}
            />
         ) : null}
         <div
            className="z-50 lg:hidden"
            onClick={() => setShowMobileMenu((p) => !p)}
         >
            <Hamburger color={showMobileMenu ? "#fff" : "#000"} size={25} toggled={showMobileMenu} />
         </div>
      </nav>
   );
};

export default Navbar;
