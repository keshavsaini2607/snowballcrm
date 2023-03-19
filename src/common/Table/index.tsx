import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { usePagination, useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import "./table.css";
import TableFilters from "./TableFilters";
import { Styles } from "./TableStyles";

type props = {
   tableData: any;
   COLUMNS: any;
   setTableInstance: any;
   setCurrentPage: any;
};

const Table = ({
   tableData,
   COLUMNS,
   setTableInstance,
   setCurrentPage,
}: props) => {
   let data = useMemo(() => tableData?.data?.department_user_data, [tableData]);
   console.log({ data });

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const columns = useMemo(() => COLUMNS, []);

   const tableInstance = useTable(
      { data, columns, initialState: { pageIndex: 0, pageSize: 6 } },
      usePagination,
      useBlockLayout,
      useSticky
   );

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state: { pageIndex },
      canNextPage,
      canPreviousPage,
      allColumns,
      getToggleHideAllColumnsProps,
   } = tableInstance;

   useEffect(() => {
      setTableInstance(tableInstance);
      setCurrentPage(pageIndex);
   }, [tableInstance, pageIndex, canPreviousPage, canNextPage]);

   console.log({ pageIndex });

   return (
      <>
         <TableFilters
            allColumns={allColumns}
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
         />
         <div className="mt-10 overflow-scroll border-l-[10px] border-l-orange-500 rounded-tl-lg rounded-bl-lg pr-10 w-[98%]">
            <Styles>
               <div
                  {...getTableProps()}
                  className="table sticky"
                  style={{ overflow: "scroll" }}
               >
                  <div className="header">
                     {headerGroups.map((headerGroup) => (
                        <div
                           {...headerGroup.getHeaderGroupProps()}
                           className="tr"
                        >
                           {headerGroup.headers.map((column) => (
                              <div {...column.getHeaderProps()} className="th">
                                 {column.render("Header")}
                              </div>
                           ))}
                        </div>
                     ))}
                  </div>
                  <div {...getTableBodyProps()} className="body">
                     {page.map((row: any) => {
                        prepareRow(row);
                        return (
                           <div {...row.getRowProps()} className="tr">
                              {row.cells.map((cell: any) => (
                                 <div {...cell.getCellProps()} className="td">
                                    {cell.render("Cell")}
                                 </div>
                              ))}
                           </div>
                        );
                     })}
                  </div>
               </div>
            </Styles>
         </div>
      </>
   );
};

export default Table;
