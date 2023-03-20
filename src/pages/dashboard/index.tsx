import { Link, Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import DashboardNav from "../../components/navbar/DashboardNav";
import SmallLogo from "../../assets/smalllogo.svg";
import CrmLogo from "../../assets/crmlogo.svg";
import { dashboardMenu } from "../../utils/constants";
import { Avatar, Icon } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Root() {
   const windowSize = useWindowSize();
   const [isTabsHidden, setIsTabsHidden] = useState(false);

   useEffect(() => {
      if(windowSize.width < 768) {
         setIsTabsHidden(true);
      }
   }, [windowSize])

   return (
      <div className="w-full h-[calc(100vh)] overflow-hidden">
         <DashboardNav />
         <div className="flex">
            <aside className={`${!isTabsHidden ? "w-[20%]" : ""} py-10`}>
               <div
                  className={`flex items-center gap-1 border-secondary border-[1px] w-max  mb-5 ${
                     !isTabsHidden && "rounded-tr-xl rounded-br-xl"
                  }`}
               >
                  <span className="bg-secondary h-full px-3 relative">
                     <img src={SmallLogo} alt="small logo" />
                     {isTabsHidden && windowSize.width > 768 && (
                        <span
                           onClick={() => setIsTabsHidden(false)}
                           className="border-[1px] border-gray-400 rounded-full absolute -right-3 top-[25%] bg-white p-[2px] cursor-pointer"
                        >
                           <AiOutlineRight />
                        </span>
                     )}
                  </span>
                  {!isTabsHidden && (
                     <span className="px-6 relative">
                        <img src={CrmLogo} alt="small logo" />
                        <span className="font-bold text-primary text-sm">
                           elevate opportunity
                        </span>
                        <span
                           onClick={() => setIsTabsHidden(true)}
                           className="border-[1px] border-gray-400 rounded-full absolute -right-2 top-[25%] bg-white p-[2px] cursor-pointer"
                        >
                           <AiOutlineLeft />
                        </span>
                     </span>
                  )}
               </div>
               <ul
                  className={`flex ${
                     isTabsHidden ? "items-center" : "items-start"
                  } flex-col gap-2 w-max`}
               >
                  {dashboardMenu.map((menu) => (
                     <Link
                        to={`/dashboard/${menu.icon}`}
                        key={menu.id}
                        className={`p-2 ${
                           isTabsHidden ? "ml-2" : "ml-3"
                        } cursor-pointer flex items-center gap-3`}
                     >
                        <Icon
                           component={() => (
                              <img
                                 src={`/assets/${menu.icon}.svg`}
                                 className="w-6 h-6"
                              />
                           )}
                        />
                        {!isTabsHidden && (
                           <span className="text-[#9C9B9B]">{menu.title}</span>
                        )}
                     </Link>
                  ))}
               </ul>
            </aside>
            <section
               className={`${
                  isTabsHidden ? "w-full pl-6" : "w-[80%]"
               }  overflow-scroll h-[calc(100vh_-_10vh)]`}
            >
               <Outlet />
            </section>
         </div>
      </div>
   );
}
