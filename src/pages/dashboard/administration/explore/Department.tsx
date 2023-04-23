import React, { useEffect, useState } from "react";
import { departmentDataSharing } from "../../../../utils/constants";
import { useMutation, useQuery } from "react-query";
import {
   getDepartmentDataShare,
   getDepartments,
} from "../../../../api/departments";
import { shareData } from "../../../../api/departments";
import { DataShare, DataShareProps } from "../../../../api/departments/types";

const Department = ({ cell }: any) => {
   const [currentDepartment, setCurrentDepartment] = useState<any>(null);
   const [dataSharedTo, setDataSharedTo] = useState<any[]>([]);
   const [dataSharedFrom, setDataSharedFrom] = useState<any[]>([]);
   const [shareTo, setShareTo] = useState<any[]>([]);

   const { data, isLoading } = useQuery("departments", getDepartments);
   useEffect(() => {
      if (!isLoading && data instanceof Array) {
         (async () => {
            let dept = data.find((item) => item.name === cell?.value);
            setCurrentDepartment(dept);
            const response = await getDepartmentDataShare(dept.id);
            console.log(response, "res#");
            if (response) {
               setDataSharedTo(response.shared_to);
               setDataSharedFrom(response.shared_from);
            }
         })();
      }
   }, [data]);

   const isShared = (dept: any): boolean => {
      return dataSharedTo.some((item) => item.id === dept.id);
   };

   const handleDataShare = (dept: any) => {
      let alreadyExists = dataSharedTo.some((item) => item.id === dept.id);
      if (!alreadyExists) {
         setDataSharedTo([...dataSharedTo, dept]);
      } else {
         let filtered = dataSharedTo.filter((item) => item.id !== dept.id);
         setDataSharedTo(filtered);
      }
      console.log({dataSharedTo})
      let shareTo: any[] = [];
      data.forEach((data: any) => {
         if (data.id !== currentDepartment.id) {
            shareTo.push({
               department_id: data.id,
               is_shared: false,
            });
         }
      });
      console.log({shareTo})
      dataSharedTo.forEach((sharedTo: any) => {
         let fieldIndex = shareTo.findIndex((item: any) => item.department_id === sharedTo.id);
         console.log("shareTo index", fieldIndex);
         shareTo[fieldIndex] = { ...shareTo[fieldIndex], is_shared: !shareTo[fieldIndex].is_shared };
      });
      // let payload: DataShareProps = {
      //    department: dept.id,
      //    shared_to: dataSharedTo,
      // };
      // console.log({ shareTo });

      // shareDataMutation.mutate(payload);
   };

   const shareDataMutation = useMutation(shareData, {
      onSuccess(data, variables, context) {
         console.log("shared data", data);
      },
      onError(error, variables, context) {
         console.log("error sharing data", error);
      },
   });

   return (
      <div>
         <div className="border-b-[1px] border-b-gray-300 w-[100%] py-2 pb-10">
            <div className="flex items-start justify-between w-[60%] text-sm ">
               <div className="flex flex-col  gap-3 mt-4">
                  <span>Created: 12/02/2023</span>
                  <span>Updated: 12/02/2023</span>
               </div>
               <div className="flex items-start gap-1 relative">
                  <span className="">Users: </span>
                  <div className="flex flex-col absolute -right-28 text-sm text-gray-600">
                     <span>Sam Benny (Org.)</span>
                     <span>Nipun Rao</span>
                     <span>Lin You</span>
                     <span>Mohan Mathur</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="pt-10">
            <h1 className="font-extrabold text-lg">
               Cross Department Data Sharing
            </h1>
            {isLoading ? (
               <h1>Loading Departments</h1>
            ) : (
               <div className="flex items-start justify-between mt-5">
                  <div>
                     <h2 className="mb-3">
                        <span className="text-primary">{cell?.value}</span>{" "}
                        department sharing data with
                     </h2>
                     {data &&
                        dataSharedTo &&
                        data?.map((dept: any) => (
                           <>
                              {dept.name !== cell?.value && (
                                 <div className="flex items-center gap-3 mb-3">
                                    <input
                                       type="checkbox"
                                       name={dept.name}
                                       id={dept.id}
                                       checked={isShared(dept)}
                                       onChange={() => handleDataShare(dept)}
                                    />
                                    <span>{dept.name}</span>
                                 </div>
                              )}
                           </>
                        ))}
                  </div>
                  <div>
                     <h2 className="mb-3">
                        Departments sharing data with{" "}
                        <span className="text-primary">{cell?.value}</span>{" "}
                        department
                     </h2>
                     {data &&
                        dataSharedTo &&
                        data?.map((dept: any) => (
                           <>
                              {dept.name !== cell?.value && (
                                 <div className="flex items-center gap-3 mb-3">
                                    <input
                                       type="checkbox"
                                       name={dept.name}
                                       id={dept.id}
                                       disabled
                                    />
                                    <span>{dept.name}</span>
                                 </div>
                              )}
                           </>
                        ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Department;
