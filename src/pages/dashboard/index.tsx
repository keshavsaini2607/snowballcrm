import { Link, Outlet, useLocation } from "react-router-dom";
import DashboardNav from "../../components/navbar/DashboardNav";
import { dashboardMenu } from "../../utils/constants";
import { Icon } from "@mui/material";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../utils/useWindowSize";

export default function Root() {
   const windowSize = useWindowSize();
   const [isTabsHidden, setIsTabsHidden] = useState<boolean>(false);
   const [activeTab, setActiveTab] = useState<string>("administration");
   const location = useLocation();
   const [mouseHovered, setMouseHovered] = useState<any>(null);

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
               } py-8 transition duration-500 ease-in-out`}
            >
               <div
                  className={`relative w-[70%] h-[40px] border-secondary ${
                     !isTabsHidden && "border-[1px]"
                  } rounded-tr-lg rounded-br-lg flex items-center gap-4`}
               >
                  <img
                     src={"/logosmall.svg"}
                     alt=""
                     className={`h-[100%] min-w-[25%] bg-secondary ${
                        isTabsHidden
                           ? "w-[90px] h-[40px] rounded-tr-lg rounded-br-lg pr-2 py-[1px]"
                           : "w-[25%]"
                     }`}
                  />
                  {!isTabsHidden && windowSize.width > 768 && (
                     <div className="w-[45%] flex flex-col gap-[1px]">
                        <img src="/assets/crm.svg" alt="" className="w-full" />
                        <img src="/assets/opp.svg" alt="" className="w-full" />
                     </div>
                  )}
                  {isTabsHidden && windowSize.width > 768 && (
                     <span
                        onClick={() => setIsTabsHidden(false)}
                        className="border-[1px] border-[#9c9a9a] rounded-full absolute -right-3 top-[25%] bg-white p-[2px] cursor-pointer"
                     >
                        <AiOutlineRight color="#9c9a9a" />
                     </span>
                  )}
                  {!isTabsHidden && (
                     <span
                        onClick={() => setIsTabsHidden(true)}
                        className="border-[1px] border-[#9c9a9a] rounded-full absolute -right-3 top-[25%] bg-white p-[2px] cursor-pointer"
                     >
                        <AiOutlineLeft color="#9c9a9a" />
                     </span>
                  )}
               </div>
               <ul className={`flex mt-5  flex-col gap-2 w-max`}>
                  {dashboardMenu.map((menu) => (
                     <li key={menu.id}>
                        <Link
                           to={`/dashboard/${menu.icon}`}
                           className={`p-2 ml-2 w-full cursor-pointer flex items-center gap-2 ${
                              activeTab === menu.icon &&
                              "bg-[rgba(235,125,49,0.1)] rounded-lg"
                           } `}
                           onMouseOver={() => setMouseHovered(menu.id)}
                           onMouseOut={() => setMouseHovered(null)}
                        >
                           <Icon
                              component={() => (
                                 <img
                                    src={`/assets/${menu.icon}${
                                       (activeTab === menu.icon || mouseHovered === menu.id)
                                          ? "_active"
                                          : ""
                                    }.svg`}
                                    className={`w-5 h-5 `}
                                 />
                              )}
                              className="w-[30%]"
                           />
                           <div
                              className={`border-[2px] rounded-md ${
                                 (activeTab === menu.icon || mouseHovered === menu.id)
                                    ? "border-primary"
                                    : "border-transparent"
                              } h-[100%] py-2 `}
                           ></div>
                           {!isTabsHidden && (
                              <span
                                 className={`text-[#9C9B9B] text-sm ${
                                    (activeTab === menu.icon || mouseHovered === menu.id) &&
                                    "text-primary font-extrabold"
                                 }`}
                              >
                                 {menu.title}
                              </span>
                           )}
                        </Link>
                     </li>
                  ))}
               </ul>
            </aside>
            <section
               className={`${
                  isTabsHidden ? "w-full pl-6" : "w-[90%]"
               }  overflow-scroll h-[calc(100vh_-_10vh)] hide-scroll`}
            >
               <Outlet />
            </section>
         </div>
      </div>
   );
}
