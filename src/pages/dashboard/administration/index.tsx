import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAdministrationData } from "../../../api/administration";
import Table from "../../../common/Table";
import TableFilters from "../../../common/Table/TableFilters";
import { COLUMNS } from "./TableColumns";

const Administration = () => {
   const [tableInstance, setTableInstance] = useState<any>();
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      adminDataMutation.mutate({
         organization_name: "snowball_crm",
         offset: 0,
         limit: 100,
      });
   }, []);

   const adminDataMutation = useMutation(getAdministrationData, {
      onSuccess(data, variables, context) {
         console.log("admin data", data);
      },
      onError(error, variables, context) {
         console.log("error getting admin data", error);
      },
   });

   return (
      <div className="overflow-hidden">
         <header className="flex items-center gap-10 border-b-[1px] py-6 border-b-gray-300">
            <h1 className="text-4xl font-bold">Administration</h1>
            <div className="flex items-center gap-10">
               <span className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-500">0</span>
                  <span className="text-sm">Total Users</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <span className="text-sm"> Verified</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-red-600">0</span>
                  <span className="text-sm">Pending Verification</span>
               </span>
            </div>
         </header>
         <div >
            {!adminDataMutation.isLoading && adminDataMutation.isSuccess && (
               <Table
                  tableData={adminDataMutation?.data}
                  COLUMNS={COLUMNS}
                  setTableInstance={setTableInstance}
                  setCurrentPage={setCurrentPage}

               />
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
                     Show {pageSize}
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
      </div>
   );
};

export default Administration;
