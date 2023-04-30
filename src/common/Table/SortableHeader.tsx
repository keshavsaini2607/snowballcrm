import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import SortHeaderMenu from "./SortHeaderMenu";
import { GrStar } from "react-icons/gr";
import { handleUnderscore } from "../../utils/helpers";
import ColumnMenuModal from "../Modals/ColumnMenuModal";
import { useQuery } from "react-query";
import { getUserAttributes } from "../../api/userAttributes";

type props = {
   column: any;
};


const SortableHeader = ({ column }: props) => {
   const [showSort, setShowSort] = useState(false);
   const [iconName, setIconName] = useState("sort");
   const [mouseHover, setMouseHover] = useState(false);
   const [showColumnMenu, setShowColumnMenu] = useState(false);
   const { data } = useQuery('userAttributes', getUserAttributes);
   const [showSortForCols, setShowSortForCols] = useState(["Department", "User", "Email"])


   const showHeader = (): boolean => {
      let show = false;
      showSortForCols.forEach((col) => {
         if (col === column.Header) {
            show = true;
         }
      });
      return show;
   };

   useEffect(() => {
      if(data && data instanceof Array) {
         let temp: any = [];
         data.forEach((attribute: any) => {
            let alreadyExists = showSortForCols.some((item) => item === attribute.name);
            if(!alreadyExists) {
               temp.push(attribute.name);
            }
         })
         setShowSortForCols([...showSortForCols, ...temp]);
      }
   }, [data])

   

   const isMandatoryColumn = () => {
      if(column.Header === 'Department' || column.Header === 'User' || column.Header === 'Email') {
         return true;
      }
   }
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

         {showHeader() && showSort && !isMandatoryColumn() && (
            <BsThreeDots
               className={`cursor-pointer ${mouseHover && 'text-primary'}`}
               size={17}
               onMouseOver={() => setMouseHover(true)}
               onMouseOut={() => setMouseHover(false)}
               onClick={() => setShowColumnMenu(true)}
            />
         )}
         <ColumnMenuModal 
            open={showColumnMenu}
            handleClose={() => setShowColumnMenu(false)}
            column={column}
         />
      </div>
   );
};

export default SortableHeader;
