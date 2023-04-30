import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
   usePagination,
   useTable,
   useBlockLayout,
   useFilters,
   useRowSelect,
   useSortBy,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { useAppSelector } from "../../shared/hooks";
import FloatingMenu from "./FloatingMenu";
import NewRecordRow from "./NewRecordRow";
import "./table.css";
import TableFilters from "./TableFilters";
import { Styles } from "./TableStyles";
import AddFeatureModal from "../Modals/AddFeatureModals";
import CellInput from "./CellInput";
import { handleUnderscore } from "../../utils/helpers";
import SortableHeader from "./SortableHeader";
import UserCell from "./UserCell";
import UserAccessOption from "./UserAccessOption";
import { useQuery } from "react-query";
import { getActivityAccess } from "../../api/types";

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
   const [cols, setCols] = useState<any[]>(COLUMNS);
   const [showAddFeature, setShowAddFeature] = useState<boolean>(false);
   const [featureToAdd, setFeatureToAdd] = useState<string>("");
   const createNewRowRef = useRef<any>();
   const [newRows, setNewRows] = useState(0);
   const [createRows, setCreateRows] = useState<any[]>([]);
   const [alreadySorted, setAlreadySorted] = useState(false);
   const messagesEndRef = useRef<any>(null);

   const { data: activityAccess } = useQuery(
      "activityAccess",
      getActivityAccess
   );

   useEffect(() => {
      if (showOnlyRow.length > 0) {
         setDataToShow(showOnlyRow);
      } else {
         setDataToShow(originalData);
      }
   }, [showOnlyRow]);

   useEffect(() => {
      setCols([...COLUMNS]);
   }, [COLUMNS]);

   useEffect(() => {
      if (showOnlyRow.length < 1 && !alreadySorted) {
         dataToShow.forEach((user) => {
            if (user && user.user_attributes) {
               user.user_attributes.sort(
                  (a: any, b: any) => a.attribute_id - b.attribute_id
               );
            }
         });
         setAlreadySorted(true);
      }
   }, [dataToShow]);

   let columns = useMemo(() => {
      return cols;
   }, [cols]);

   let data: any[] = useMemo(() => dataToShow, [tableData, dataToShow]);

   //
   //

   const toggleAddFeatureModal = (headerTitle: any) => {
      setShowAddFeature((p) => !p);
      setFeatureToAdd(headerTitle);
   };

   console.log({activityAccess})

   function isActivityAccessInput(headerName: string) {
      if (activityAccess && activityAccess instanceof Array) {
         for (const activity of activityAccess) {
            if (activity.parent_name === headerName) {
               return true;
            } 
         }
         return false;
      }
   }

   useEffect(() => {
      let arr = [];
      for (let index = 0; index < newRows; index++) {
         arr.push(
            <NewRecordRow createNewRowRef={createNewRowRef} key={index} />
         );
      }
      setCreateRows(arr);
   }, [newRows]);

   const tableInstance = useTable(
      //@ts-ignore
      { data, columns, initialState: { pageIndex: 0, pageSize: 6 } },
      useBlockLayout,
      useSticky,
      useFilters,
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
         hooks.visibleColumns.push((columns) => [
            {
               id: "selection",

               //@ts-ignore
               Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div className="check">
                     <input
                        type="checkbox"
                        {...getToggleAllRowsSelectedProps()}
                        className=""
                     />
                  </div>
               ),
               sticky: "left",
               Cell: ({ row }) => (
                  <div className="check">
                     <input
                        type="checkbox"
                        id="my-checkbox"
                        name="my-checkbox"
                        //@ts-ignore
                        {...row.getToggleRowSelectedProps()}
                     />
                  </div>
               ),
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

   return (
      <>
         <TableFilters
            allColumns={allColumns}
            getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
            userData={originalData}
         />
         <div className="border-l-[10px] border-l-orange-500 rounded-tl-lg rounded-bl-lg ">
            <div
               ref={messagesEndRef}
               className="mt-5 pr-10 w-[98%] max-h-[50vh] overflow-scroll"
            >
               <Styles>
                  <div
                     {...getTableProps()}
                     className="table sticky"
                     style={{ overflow: "scroll" }}
                  >
                     <div className="header text-sm">
                        {headerGroups.map((headerGroup: any, key: any) => (
                           <div
                              {...headerGroup.getHeaderGroupProps()}
                              className="tr"
                           >
                              {headerGroup.headers.map(
                                 (column: any, index: any) => (
                                    <>
                                       <div
                                          {...column.getHeaderProps()}
                                          className={`th main_head-${key} head-${index} ${
                                             index === 0 ? "left-sticky" : ""
                                          }`}
                                       >
                                          {column?.Header === "Add Column" ? (
                                             <button
                                                type="button"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="inline-block rounded bg-transparent px-6 py-2.5 text-xs font-medium uppercase leading-tight text-gray-700 transition duration-150 ease-in-out focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                                onClick={() =>
                                                   toggleAddFeatureModal(
                                                      column?.Header
                                                   )
                                                }
                                             >
                                                + Add Column
                                             </button>
                                          ) : (
                                             <>
                                                {column?.id !== "selection" ? (
                                                   <span
                                                      className="w-full"
                                                      style={{
                                                         position: "relative",
                                                      }}
                                                   >
                                                      <SortableHeader
                                                         column={column}
                                                      />
                                                   </span>
                                                ) : (
                                                   <span>
                                                      {column.render("Header")}
                                                   </span>
                                                )}
                                             </>
                                          )}
                                       </div>
                                    </>
                                 )
                              )}
                           </div>
                        ))}
                     </div>
                     <div
                        {...getTableBodyProps()}
                        className="body text-sm main_row "
                     >
                        {page.map((row: any) => {
                           {
                           }
                           prepareRow(row);
                           return (
                              <div {...row.getRowProps()} className={`tr p-0`}>
                                 {row.cells.map((cell: any, index: any) => (
                                    <div
                                       {...cell.getCellProps()}
                                       className={`td td-0`}
                                    >
                                       {cell?.column?.id === "selection" ? (
                                          <div
                                             className={` py-[8px] px-3 td-${index}`}
                                          >
                                             {cell.render("Cell")}
                                          </div>
                                       ) : (
                                          <>
                                             {isActivityAccessInput(
                                                cell?.column?.parent?.Header
                                             ) ? (
                                                <>
                                                   <UserAccessOption cell={cell} />
                                                </>
                                             ) : (
                                                <>
                                                   {cell?.column?.id ===
                                                   "User" ? (
                                                      <UserCell
                                                         cell={cell}
                                                         row={row}
                                                      />
                                                   ) : (
                                                      <>
                                                         {cell.render(
                                                            <CellInput
                                                               cell={cell}
                                                               row={row}
                                                            />
                                                         )}
                                                      </>
                                                   )}
                                                </>
                                             )}
                                          </>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           );
                        })}
                     </div>
                     {createRows}
                  </div>
               </Styles>
            </div>
            <div className="text-sm">
               <div className="px-2 py-6 border-b-[1px] border-r-[1px] w-[98%] relative">
                  <div className="w-[150px] absolute top-0 left-0 p-3">
                     <input
                        type="checkbox"
                        disabled
                        className="cursor-not-allowed"
                     />
                  </div>
                  <span
                     className={`text-[#9d9b9a] px-2 py-3 cursor-pointer  top-0 left-[40px] absolute rounded-md ${
                        showAddRow ? "bg-gray-300" : ""
                     }`}
                     onClick={() => {
                        setNewRows((p) => p + 1);
                        messagesEndRef.current.scrollTop =
                           messagesEndRef.current.scrollHeight;
                     }}
                  >
                     {"+ Add Record"}
                  </span>
               </div>
            </div>
         </div>
         {selectedFlatRows.length > 0 && (
            <FloatingMenu selectedFlatRows={selectedFlatRows} />
         )}
         <AddFeatureModal
            open={showAddFeature}
            handleClose={() => setShowAddFeature(false)}
            featureToAdd={featureToAdd}
         />
      </>
   );
};

export default Table;
