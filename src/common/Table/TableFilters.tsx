import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { setShowOnlyRow } from "../../shared/slices/tableFilterSlice";
import Checkbox from "./Checkbox";
import { useQuery } from "react-query";
import { getUsers } from "../../api/users";
import { getAdministrationData } from "../../api/administration";
import { handleUnderscore } from "../../utils/helpers";

interface HideFilterProps {
   allColumns: any;
   getToggleHideAllColumnsProps: any;
}

interface PersonFilterProps {
   userData: any[];
}

interface props extends PersonFilterProps, HideFilterProps {}

const PersonFilter = ({ userData }: PersonFilterProps) => {
   const dispatch = useAppDispatch();
   const { showOnlyRow } = useAppSelector((state) => state.table);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleFilter = (column: any) => {
      dispatch(setShowOnlyRow(column));
      handleClose();
   };

   const getNameAttribute = (attributes: any[]): any => {
      attributes.forEach((attr) => {
         if (attr.name === "First Name") {
            return attr;
         }
      });
   };

   return (
      <>
         <button
            className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
               open && "bg-gray-100"
            } p-2 rounded-lg text-sm`}
            onClick={handleClick}
         >
            <img src="/filter/person.svg" />
            <span className="border-r-[1px] border-r-gray-300 text-[#b2b3b3] pr-2">
               Person
            </span>
            <span className="text-[#b2b3b3]">{showOnlyRow.length}</span>
         </button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
            className="h-[300px]"
         >
            <div className="border-l-[4px] border-l-primary h-full text-text">
               <p className="pl-4 py-2 font-extrabold">Users</p>
               {userData?.map((column) => (
                  <MenuItem
                     key={Math.random().toString()}
                     onClick={() => handleFilter(column)}
                  >
                     <label className="flex items-center">
                        <input
                           type="checkbox"
                           checked={showOnlyRow.find(
                              (col) => col.username === column.username
                           )}
                           readOnly
                        />
                        <span className="ml-4 text-sm">
                           {getNameAttribute(column?.user_attributes)?.value ||
                              column?.username}
                        </span>
                     </label>
                  </MenuItem>
               ))}
            </div>
         </Menu>
      </>
   );
};

const Filters = () => {
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <div>
         <button
            className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
               open && "bg-gray-100"
            } p-2 rounded-lg text-sm`}
            onClick={handleClick}
         >
            <img src="/filter/filter.svg" />
            <span className="border-r-[1px] border-r-gray-300 pr-2 text-[#b2b3b3]">
               Filter
            </span>
            <span className="text-[#b2b3b3]">0</span>
         </button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
            className="h-[300px]"
         >
            <div className="border-l-[4px] border-l-primary h-full text-text p-4">
               <div className="flex items-center gap-6 mb-5">
                  <p className="w-[15%]">Where</p>
                  <select className="border-[1px] w-[15vw]">
                     <option disabled>Column</option>
                  </select>
                  <select className="border-[1px] w-[15vw]" placeholder="Condition">
                     <option disabled>Condition</option>
                  </select>
                  <select className="border-[1px] w-[15vw]">
                     <option disabled>Value</option>
                  </select>
               </div>
               <div className="flex items-center gap-6 mb-5">
                  <p className="w-[15%]">And</p>
                  <select className="border-[1px] w-[15vw]">
                     <option disabled>Column</option>
                  </select>
                  <select className="border-[1px] w-[15vw]" placeholder="Condition">
                     <option disabled>Condition</option>
                  </select>
                  <select className="border-[1px] w-[15vw]">
                     <option disabled>Value</option>
                  </select>
               </div>
               <button>
                  <span className="text-[#a2a0a0]">+ Add new filter</span>
               </button>
            </div>
         </Menu>
      </div>
   );
};

const HideFilters = ({
   allColumns,
   getToggleHideAllColumnsProps,
}: HideFilterProps) => {
   const [columns, setColumns] = useState<any[]>();
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   let cols: any = useMemo(() => {
      allColumns;
   }, []);
   const getHiddenCount = () => {
      let hidden = 0;
      allColumns.map((col: any) => {
         if (!col.isVisible) {
            hidden += 1;
         }
      });
      return hidden;
   };

   useEffect(() => {
      setColumns(allColumns);
   }, [allColumns]);
   return (
      <>
         <button
            className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 ${
               open && "bg-gray-100"
            } p-2 rounded-lg text-sm`}
            onClick={handleClick}
         >
            <img src="/filter/hide.svg" />
            <span className="border-r-[1px]  border-r-gray-300 pr-2 text-[#b2b3b3]">
               Hide
            </span>
            <span className="text-[#b2b3b3]">{getHiddenCount()}</span>
         </button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="h-[300px] w-[290px] p-0"
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            <div className="border-l-[4px] border-l-primary h-full text-text">
               <p className="pl-4 py-2 font-extrabold">Columns</p>
               {columns?.map((column: any) => (
                  <>
                     {column?.Header.length > 1 && (
                        <MenuItem key={column?.id}>
                           <label className="flex items-center">
                              <input
                                 type="checkbox"
                                 value={column?.isVisible}
                                 {...column?.getToggleHiddenProps()}
                              />
                              <span className="ml-4 text-sm">
                                 {handleUnderscore(column?.Header)}
                              </span>
                           </label>
                        </MenuItem>
                     )}
                  </>
               ))}
            </div>
         </Menu>
      </>
   );
};

const TableFilters = ({
   allColumns,
   getToggleHideAllColumnsProps,
   userData,
}: props) => {
   return (
      <div className="flex items-center gap-6 py-2 flex-wrap">
         <PersonFilter userData={userData} />
         <Filters />
         <HideFilters
            allColumns={allColumns}
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
         />
      </div>
   );
};

export default TableFilters;
