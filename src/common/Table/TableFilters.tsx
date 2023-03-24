import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { setShowOnlyRow } from "../../shared/slices/tableFilterSlice";
import Checkbox from "./Checkbox";

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

   return (
      <>
         <button
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={handleClick}
         >
            <img src="/filter/person.svg" />
            <span className="border-r-[1px] border-r-gray-300 pr-2">
               Person
            </span>
            <span>{showOnlyRow.length}</span>
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
            {userData?.map((column) => (
               <MenuItem
                  key={Math.random().toString()}
                  onClick={() => handleFilter(column)}
               >
                  <label>
                     <input
                        type="checkbox"
                        checked={showOnlyRow.find(
                           (col) => col.user_id === column.user_id
                        )}
                        readOnly
                     />
                     <span className="ml-4">
                        {column?.user_attributes[2]?.value +
                           " " +
                           column?.user_attributes[3]?.value || ""}
                     </span>
                  </label>
               </MenuItem>
            ))}
         </Menu>
      </>
   );
};

const Filters = () => {
   return (
      <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
         <img src="/filter/filter.svg" />
         <span className="border-r-[1px] border-r-gray-300 pr-2">Filter</span>
         <span>0</span>
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
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={handleClick}
         >
            <img src="/filter/hide.svg" />
            <span className="border-r-[1px] border-r-gray-300 pr-2">Hide</span>
            <span>{getHiddenCount()}</span>
         </button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="h-[300px]"
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            {columns?.map((column: any) => (
               <MenuItem key={column?.id}>
                  <label>
                     <input
                        type="checkbox"
                        value={column?.isVisible}
                        {...column?.getToggleHiddenProps()}
                     />
                     <span className="ml-4">{column?.Header}</span>
                  </label>
               </MenuItem>
            ))}
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
