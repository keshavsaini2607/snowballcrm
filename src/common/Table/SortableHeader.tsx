import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SortHeaderMenu from "./SortHeaderMenu";
import { GrStar } from "react-icons/gr";
import { handleUnderscore } from "../../utils/helpers";

type props = {
   column: any;
};

const showSortForCols = ["Department", "User", "Email"];

const SortableHeader = ({ column }: props) => {
   const [showSort, setShowSort] = useState(false);
   const [iconName, setIconName] = useState("sort");
   const [mouseHover, setMouseHover] = useState(false);
   const showHeader = (): boolean => {
      let show = false;
      showSortForCols.forEach((col) => {
         if (col === column.Header) {
            show = true;
         }
      });
      return show;
   };
   return (
      <div
         className="flex items-center justify-between pr-2 gap-1 w-[100%] relative"
         onMouseOver={() => setShowSort(true)}
         onMouseOut={() => setShowSort(false)}
      >
         <div className="flex items-center gap-1">
            <div>
               {showHeader() && showSort && (
                  <img
                     src={`/assets/sort/${iconName}.svg`}
                     className="sort-icon"
                     style={{ zIndex: 1000 }}
                     {...column.getHeaderProps(column.getSortByToggleProps())}
                     onMouseOver={() => setIconName("sort-hover")}
                     onMouseOut={() => setIconName("sort")}
                  />
               )}
            </div>
            <div>
               <p className="flex items-start gap-1">
                  <p>{handleUnderscore(column?.Header)}</p>
                  {(column.Header === "User" || column.Header === "Email") && (
                     <GrStar color="red" className="w-[10px]" />
                  )}
               </p>
            </div>
         </div>

         {showHeader() && showSort && (
            <BsThreeDots
               className={`cursor-pointer ${mouseHover && 'text-primary'}`}
               size={17}
               onMouseOver={() => setMouseHover(true)}
               onMouseOut={() => setMouseHover(false)}
            />
         )}
      </div>
   );
};

export default SortableHeader;
