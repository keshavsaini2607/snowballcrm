import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../shared/hooks";
import Checkbox from "./Checkbox";

interface HideFilterProps {
   allColumns: any;
   getToggleHideAllColumnsProps: any;
}

interface props extends HideFilterProps {}

const PersonFilter = () => {
   const tableInstance = useAppSelector((state) => state.table.tableInstance);
   console.log({ tableInstance });
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
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
            <span>0</span>
         </button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
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

   const handleReValidate = (column: any) => {
      let colToUpdate = columns?.find((col) => col.id === column.id);
      colToUpdate.isVisible = !colToUpdate.isVisible;
   }

   useEffect(() => {
      setColumns(allColumns);
   }, [allColumns])
   return (
      <>
         <button
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={handleClick}
         >
            <img src="/filter/hide.svg" />
            <span className="border-r-[1px] border-r-gray-300 pr-2">Hide</span>
            <span>0</span>
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
               <MenuItem key={column?.id} onClick={() => handleReValidate(column)}>
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

const TableFilters = ({ allColumns, getToggleHideAllColumnsProps }: props) => {
   return (
      <div className="flex items-center gap-6 py-4">
         <PersonFilter />
         <Filters />
         <HideFilters
            allColumns={allColumns}
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
         />
      </div>
   );
};

export default TableFilters;
