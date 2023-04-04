import {
   Link,
   Navigate,
   Outlet,
   redirect,
   useLocation,
   useNavigate,
} from "react-router-dom";
import DashboardNav from "../../components/navbar/DashboardNav";
import SmallLogo from "../../assets/smalllogo.svg";
import CrmLogo from "../../assets/crmlogo.svg";
import { dashboardMenu } from "../../utils/constants";
import { Avatar, Icon } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Root() {
   const windowSize = useWindowSize();
   const [isTabsHidden, setIsTabsHidden] = useState<boolean>(false);
   const [activeTab, setActiveTab] = useState<string>("administration");
   const location = useLocation();

   console.log({ isTabsHidden });

   useEffect(() => {
      if (windowSize.width < 768) {
         setIsTabsHidden(true);
      }
   }, [windowSize]);

   useEffect(() => {
      let locationString = location.pathname.split("/")[2];
      if (locationString != activeTab) {
         setIsTabsHidden(isTabsHidden);
         setActiveTab(locationString);
      }

      return () => {};
   }, [location]);

   return (
      <div className="w-full h-[calc(100vh)] overflow-hidden">
         <DashboardNav />
         <div className="flex">
            <aside
               className={`ease-in-out duration-300 ${
                  !isTabsHidden ? "w-[20%] " : ""
               } py-6 transition duration-500 ease-in-out`}
            >
               <div className="w-[70%] relative h-[50px]">
                  <img
                     src={isTabsHidden ? "/logosmall.svg" : "/crm_full.svg"}
                     alt=""
                     className={`w-[100%] ${isTabsHidden && 'bg-secondary h-[95%]'} `}
                  />
                  {isTabsHidden && windowSize.width > 768 && (
                     <span
                        onClick={() => setIsTabsHidden(false)}
                        className="border-[1px] border-gray-400 rounded-full absolute -right-3 top-[25%] bg-white p-[2px] cursor-pointer"
                     >
                        <AiOutlineRight />
                     </span>
                  )}
                  {!isTabsHidden && (
                     <span
                        onClick={() => setIsTabsHidden(true)}
                        className="border-[1px] border-gray-400 rounded-full absolute -right-1 top-[25%] bg-white p-[2px] cursor-pointer"
                     >
                        <AiOutlineLeft />
                     </span>
                  )}
               </div>
               <ul
                  className={`flex mt-5 ${
                     isTabsHidden ? "items-center" : "items-start"
                  } flex-col gap-2 w-max`}
               >
                  {dashboardMenu.map((menu) => (
                     <Link
                        to={`/dashboard/${menu.icon}`}
                        key={menu.id}
                        className={`p-2 ml-2 w-full cursor-pointer flex items-center gap-2 ${
                           activeTab === menu.icon &&
                           "bg-[rgba(235,125,49,0.1)] rounded-lg"
                        }`}
                     >
                        <Icon
                           component={() => (
                              <img
                                 src={`/assets/${menu.icon}.svg`}
                                 className="w-5 h-5 "
                              />
                           )}
                        />
                        <div
                           className={`border-[2px] rounded-md ${
                              activeTab === menu.icon
                                 ? "border-primary"
                                 : "border-transparent"
                           } h-[100%] py-2 `}
                        ></div>
                        {!isTabsHidden && (
                           <span
                              className={`text-[#9C9B9B] text-sm ${
                                 activeTab === menu.icon &&
                                 "text-primary font-extrabold"
                              }`}
                           >
                              {menu.title}
                           </span>
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
