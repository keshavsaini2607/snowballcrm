import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getAdministrationData } from "../../../api/administration";
import Table from "../../../common/Table";
import { COLUMNS, EMPTY_COLUMNS } from "./TableColumns";
import EmptyTable from "../../../common/Table/EmptyTable";
import {
   getAllActivityAccessTypes,
   getUserAttributes,
} from "../../../api/userAttributes";
import Loader from "../../../components/loader";
import { useNavigate } from "react-router-dom";

const Administration = () => {
   const [tableInstance, setTableInstance] = useState<any>();
   const [currentPage, setCurrentPage] = useState(1);
   const [columns, setColumns] = useState(COLUMNS);
   const navigate = useNavigate();

   const { data, isLoading, isError, error, isSuccess } = useQuery(
      ["users", { page: 1, page_size: 10 } as any],
      getAdministrationData
   );

   const { data: userAttributes, isLoading: userAttributeLoading } = useQuery(
      "userAttributes",
      getUserAttributes
   );

   const { data: accessTypes, isLoading: accessLoading } = useQuery(
      "accessTypes",
      getAllActivityAccessTypes
   );

   // 

   useEffect(() => {
      if (!accessLoading && accessTypes instanceof Array) {
         const accessObject: any = {
            Client_Access: [],
            Form_Access: [],
            Lead_Access: [],
            Marketing_Access: [],
            Document_Access: [],
            Client_onboarding_access: [],
            Department_view_access: [],
            User_access: [],
            Access_control: [],
            Form_field_access: [],
            Export_access: [],
            Progress_view_access: [],
            Email_Notification: [],
            lead_board: [],
         };

         accessTypes.forEach((access) => {
            accessObject[access.parent_name].push({
               Header: access.child_name,
               accessor: access.child_name[Math.random()],
            });
         });

         
         Object.entries(accessObject).map(([key, value]) => {
            let alreadyExists = COLUMNS.find((item) => item.Header === key);
            if (!alreadyExists) {
               COLUMNS.push({
                  Header: key,
                  //@ts-ignore
                  columns: value,
               });
            }
         });
      }
   }, [accessLoading, accessTypes]);

   function getAccessor(attributeId: number): string {
      let result: string = "";
      if (data && data?.length > 0) {
         data[0]?.user_attributes?.forEach((attribute: any, index: number) => {
            if (attribute?.attribute_id === attributeId) {
               result = `user_attributes[${index}].value`;
            }
         });
      }

      return result;
   }

   useEffect(() => {
      if (userAttributes instanceof Array) {
         userAttributes?.push({
            name: "Add Column",
         });
         userAttributes.forEach((attribute) => {
            let alreadyExists = COLUMNS[1]?.columns?.find(
               (column: any) => column?.Header === attribute?.name
            );

            if (!alreadyExists) {
               //@ts-ignore
               COLUMNS[1]?.columns?.push({
                  Header: attribute?.name,
                  accessor: getAccessor(attribute?.id) ?? "",
               });
            }
         });
      }

      setColumns(COLUMNS);
      // navigate('/dashboard/administration')
   }, [userAttributes]);

   

   return (
      <div className="overflow-hidden">
         <header className="flex flex-col md:flex-row items-center gap-3 md:gap-10 border-b-[1px] py-6 border-b-gray-300">
            <h1 className="text-2xl md:text-4xl font-bold md:mr-20">Administration</h1>
            <div className="flex items-center gap-10">
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-blue-500">0</span>
                  <span className="text-xs md:text-sm text-[#aeafaf]">Total Users</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <span className="text-xs md:text-sm text-[#aeafaf]"> Verified</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-red-600">0</span>
                  <span className="text-xs md:text-sm text-[#aeafaf]">
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
