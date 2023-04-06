import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
import NewRecordRow from "./NewRecordRow";
import "./table.css";
import TableFilters from "./TableFilters";
import { Styles } from "./TableStyles";
import { EMPTY_COLUMNS } from "../../pages/dashboard/administration/TableColumns";

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
   let originalData = tableData;
   const [dataToShow, setDataToShow] = useState<any[]>(originalData);
   const [showAddRow, setShowAddRow] = useState(false);
   const createNewRowRef = useRef<any>();


   console.log({tableData})

   const handleSubmit = (event: FormEvent) => {
      event.preventDefault(); // prevent default form submission behavior
      console.log("submitting");
      createNewRowRef.current.click(); // submit the form using the reference
   };

   useEffect(() => {
      showOnlyRow.length > 0
         ? setDataToShow(showOnlyRow)
         : setDataToShow(originalData);
   }, [showOnlyRow]);

   let data: any[] = useMemo(() => dataToShow, [tableData, dataToShow]);
   const columns = useMemo(() => data?.length > 0 ? COLUMNS : EMPTY_COLUMNS, []);


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
         <div className="mt-5 overflow-scroll border-l-[10px] border-l-orange-500 rounded-tl-lg rounded-bl-lg pr-10 w-[98%]">
            <Styles>
               <div
                  {...getTableProps()}
                  className="table sticky"
                  style={{ overflow: "scroll" }}
               >
                  <div className="header text-sm">
                     {headerGroups.map((headerGroup, key) => (
                        <div
                           {...headerGroup.getHeaderGroupProps()}
                           className="tr"
                        >
                           {headerGroup.headers.map((column) => (
                              <div {...column.getHeaderProps()} className={`th main_head-${key}`}>
                                 <span>{column.render("Header")}</span>
                              </div>
                           ))}
                        </div>
                     ))}
                  </div>
                  <div {...getTableBodyProps()} className="body text-sm main_row">
                     {page.map((row: any) => {
                        prepareRow(row);
                        return (
                           <div {...row.getRowProps()} className="tr ">
                              {row.cells.map((cell: any) => (
                                 <div {...cell.getCellProps()} className="td">
                                    {cell.render("Cell")}
                                 </div>
                              ))}
                           </div>
                        );
                     })}
                  </div>
                  <div className="text-sm">
                     {showAddRow && (
                        <NewRecordRow createNewRowRef={createNewRowRef} />
                     )}
                     <div className="addrec px-2 py-4 border-[1px] border-gray-300 w-full">
                        {showAddRow && (
                           <button
                              className={` px-6 py-3 mr-4 bg-primary text-white cursor-pointer rounded-md`}
                              onClick={() => createNewRowRef?.current?.click()}
                           >
                              Create Row
                           </button>
                        )}
                        <span
                           className={`hover:bg-gray-100 border-[1px] border-gray-200 px-6 py-3 cursor-pointer rounded-md ${
                              showAddRow ? "bg-gray-300" : ""
                           }`}
                           onClick={() => setShowAddRow((p) => !p)}
                        >
                           {showAddRow ? "Cancel" : "+ Add Record"}
                        </span>
                     </div>
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
