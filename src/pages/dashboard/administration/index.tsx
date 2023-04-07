import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getAdministrationData } from "../../../api/administration";
import Table from "../../../common/Table";
import { COLUMNS, EMPTY_COLUMNS } from "./TableColumns";
import EmptyTable from "../../../common/Table/EmptyTable";
import { getUserAttributes } from "../../../api/userAttributes";
import Loader from "../../../components/loader";

const Administration = () => {
   const [tableInstance, setTableInstance] = useState<any>();
   const [currentPage, setCurrentPage] = useState(1);
   const [columns, setColumns] = useState(COLUMNS);

   const { data, isLoading, isError, error, isSuccess } = useQuery(
      ["users", { page: 1, page_size: 10 } as any],
      getAdministrationData
   );

   const { data: userAttributes, isLoading: userAttributeLoading } = useQuery(
      "userAttributes",
      getUserAttributes
   );

   function getAccessor(attributeId: number): string {
      let result: string = "";
      data[0]?.user_attributes?.forEach((attribute: any, index: number) => {
         if (attribute?.attribute_id === attributeId) {
            result = `user_attributes[${index}].value`;
         }
      });

      return result;
   }

   useEffect(() => {
      if (userAttributes instanceof Array) {
         userAttributes?.push({
            name: "Add Column",
         });
         userAttributes.forEach((attribute) => {
            let alreadyExists = COLUMNS[0]?.columns?.find(
               (column) => column?.Header === attribute?.name
            );
            if (!alreadyExists) {
               COLUMNS[0]?.columns?.push({
                  Header: attribute?.name,
                  accessor: getAccessor(attribute?.id) ?? "",
                  Cell: (() => <div></div>)
               });
            }
         });
      }

      setColumns(COLUMNS);
   }, [userAttributes]);

   return (
      <div className="overflow-hidden">
         <header className="flex flex-col md:flex-row items-center gap-3 md:gap-10 border-b-[1px] py-6 border-b-gray-300">
            <h1 className="text-2xl md:text-4xl font-bold">Administration</h1>
            <div className="flex items-center gap-10">
               <span className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-500">0</span>
                  <span className="text-xs md:text-sm">Total Users</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <span className="text-xs md:text-sm"> Verified</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-red-600">0</span>
                  <span className="text-xs md:text-sm">
                     Pending Verification
                  </span>
               </span>
            </div>
         </header>
         <div className="overflow-scroll md:overflow-hidden">
            {!isLoading && isSuccess && data.length > 0 ? (
               <Table
                  tableData={data}
                  COLUMNS={columns}
                  setTableInstance={setTableInstance}
                  setCurrentPage={setCurrentPage}
               />
            ) : (
               <EmptyTable columns={EMPTY_COLUMNS} data={[]} />
            )}
         </div>
         <div className="flex items-end py-2 px-4 gap-2 w-full justify-end">
            <select
               value={tableInstance?.pageSize}
               onChange={(e) =>
                  tableInstance?.setPageSize(Number(e.target.value))
               }
            >
               {[6, 10].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                     Rows Per Page: {pageSize}
                  </option>
               ))}
            </select>
            <span>
               Page:{" "}
               <strong>
                  {currentPage + 1} of {tableInstance?.pageOptions.length}
               </strong>{" "}
            </span>
            <button
               onClick={() => tableInstance?.previousPage()}
               disabled={!tableInstance?.canPreviousPage}
               className="border-[1px] rounded-full ml-3 w-[30px] h-[30px]"
            >
               {"<"}
            </button>
            <button
               onClick={() => tableInstance?.nextPage()}
               disabled={!tableInstance?.canNextPage}
               className="border-[1px] rounded-full ml-3 w-[30px] h-[30px]"
            >
               {">"}
            </button>
         </div>
         {isLoading || userAttributeLoading ? <Loader /> : null}
      </div>
   );
};

export default Administration;
