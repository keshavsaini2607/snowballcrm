import React, { useRef, useState } from "react";
import { useTable } from "react-table";
import NewRecordRow from "./NewRecordRow";
import { Styles } from "./TableStyles";

function EmptyTable({ columns, data }: any) {
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
         columns,
         data,
      });

   const handleCellClick = (column: any) => {
      // Handle the click event for the cell here
      if (column.Header === "Add Column") {
         console.log(`Clicked on cell value:`);
      }
   };

   const [showAddRow, setShowAddRow] = useState(false);
   const createNewRowRef = useRef<any>();

   return (
      <Styles>
         <div className="mt-10">
            <table {...getTableProps()}>
               <thead>
                  {headerGroups.map((headerGroup) => (
                     <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                           <>
                              {column?.Header === "Add Column" ? (
                                 <th style={{color: 'gray', cursor: 'pointer', width: 'max-content'}}>
                                    <input type="text" placeholder="+ Add Column" className="bg-transparent w-full outline-none" />
                                 </th>
                              ) : (
                                 <th
                                    {...column.getHeaderProps()}
                                    onClick={() => handleCellClick(column)}
                                 >
                                    {column.render("Header")}
                                 </th>
                              )}
                           </>
                        ))}
                     </tr>
                  ))}
               </thead>
               <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                     prepareRow(row);
                     return (
                        <tr {...row.getRowProps()}>
                           {row.cells.map((cell) => {
                              return (
                                 <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                 </td>
                              );
                           })}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
            <div className=" overflow-scroll">
               {showAddRow && (
                  <NewRecordRow
                     createNewRowRef={createNewRowRef}
                     isNewTable={true}
                  />
               )}
            </div>
            <div className="addrec px-2 py-4 border-l-[10px] border-primary border-b-[1px] border-b-gray-300 w-full">
               {showAddRow && (
                  <button
                     className={` px-6 py-3 mr-4 bg-primary text-white cursor-pointer rounded-md`}
                     onClick={() => createNewRowRef?.current?.click()}
                  >
                     Create Row
                  </button>
               )}
               <span
                  className={`hover:bg-gray-100 px-6 py-3 cursor-pointer rounded-md ${
                     showAddRow ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setShowAddRow((p) => !p)}
               >
                  {showAddRow ? "Cancel" : "+ Add Record"}
               </span>
            </div>
         </div>
      </Styles>
   );
}

export default EmptyTable;
