import React, { useEffect, useMemo, useState } from "react";
import {
   usePagination,
   useTable,
   useBlockLayout,
   useFilters,
   useRowSelect,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { useAppSelector } from "../../shared/hooks";
import FloatingMenu from "./FloatingMenu";
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
   const { showOnlyRow } = useAppSelector((state) => state.table);
   let originalData = tableData?.data?.department_user_data;
   const [dataToShow, setDataToShow] = useState<any[]>(originalData);

   useEffect(() => {
      showOnlyRow.length > 0
         ? setDataToShow(showOnlyRow)
         : setDataToShow(originalData);
   }, [showOnlyRow]);

   let data = useMemo(() => dataToShow, [tableData, dataToShow]);
   const columns = useMemo(() => COLUMNS, []);

   const tableInstance = useTable(
      //@ts-ignore
      { data, columns, initialState: { pageIndex: 0, pageSize: 6 } },
      useBlockLayout,
      useSticky,
      useFilters,
      usePagination,
      useRowSelect,
      (hooks) => {
         hooks.visibleColumns.push((columns) => [
            {
               id: "selection",
               //@ts-ignore
               Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                     <input
                        type="checkbox"
                        {...getToggleAllRowsSelectedProps()}
                     />
                  </div>
               ),
               Cell: ({ row }) => (
                  <div>
                     <input
                        type="checkbox"
                        //@ts-ignore
                        {...row.getToggleRowSelectedProps()}
                     />
                  </div>
               ),
               sticky: "left",
            },
            ...columns,
         ]);
      }
   );

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      //@ts-ignore
      page,
      prepareRow,
      //@ts-ignore
      state: { pageIndex },
      //@ts-ignore
      canNextPage,
      //@ts-ignore
      canPreviousPage,
      allColumns,
      //@ts-ignore
      selectedFlatRows,
      getToggleHideAllColumnsProps,
   } = tableInstance;

   useEffect(() => {
      setTableInstance(tableInstance);
      setCurrentPage(pageIndex);
   }, [tableInstance, pageIndex, canPreviousPage, canNextPage]);

   console.log({ selectedFlatRows });

   return (
      <>
         <TableFilters
            allColumns={allColumns}
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
            userData={originalData}
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
         {selectedFlatRows.length > 0 && (
            <FloatingMenu selectedFlatRows={selectedFlatRows} />
         )}
      </>
   );
};

export default Table;
