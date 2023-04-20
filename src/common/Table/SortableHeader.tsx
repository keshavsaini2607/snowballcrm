import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SortHeaderMenu from "./SortHeaderMenu";

type props = {
   column: any;
};

const showSortForCols = ["Department", "User", "Email"];

const SortableHeader = ({ column }: props) => {
   const [showSort, setShowSort] = useState(false);
   const [iconName, setIconName] = useState("sort");
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
         className="flex items-center gap-1 w-full"
         onMouseOver={() => setShowSort(true)}
         onMouseOut={() => setShowSort(false)}
      >
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
            <span>{column?.Header}</span>
         </div>
         {showHeader() && showSort && <BsThreeDots className="cursor-pointer"/>}
         {/* <SortHeaderMenu /> */}
      </div>
   );
};

export default SortableHeader;
