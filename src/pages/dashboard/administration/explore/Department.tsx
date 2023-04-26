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

            if (response && dataSharedTo.length < 1) {
               setDataSharedTo(response.shared_to);
               setDataSharedFrom(response.shared_from);
            }
         })();
      }
   }, [data]);

   const isShared = (dept: any): boolean => {
      return dataSharedTo.some((item) => item.department_id === dept.id);
   };

   const isSharing = (dept: any): boolean => {
      return dataSharedFrom.some((item) => item.department_id === dept.id);
   }

   useEffect(() => {
      console.log({dataSharedTo})
      let share: any[] = [];
      if(data && data instanceof Array) {
         data.forEach((item) => {
            if(item.id !== currentDepartment?.id) {
               if(isShared(item)) {
                  share.push({
                     department_id: item?.id,
                     is_shared: true
                  })
               } else {
                  share.push({
                     department_id: item?.id,
                     is_shared: false
                  })
               }
            }
         })
      }
      if(currentDepartment && share) {
         let payload: DataShareProps = {
            department: currentDepartment?.id,
            shared_to: share
         }
         shareDataMutation.mutate(payload);
      }
   }, [dataSharedTo])

   const handleDataShare = async (event: any, dept: any) => {
      if(isShared(dept)) {
         let filter = dataSharedTo.filter(
            (item) => item.department_id !== dept?.id
         );
         setDataSharedTo(filter);
      } else {
         setDataSharedTo([...dataSharedTo, {
            department_id: dept?.id,
            is_shared: true
         }])
      }
    

      // console.log({ dataSharedTo });

      setTimeout(() => {
         // if (dataSharedTo) {
         //    let payload: DataShareProps = {
         //       department: dept.id,
         //       shared_to: dataSharedTo,
         //    };
         //    shareDataMutation.mutate(payload);
         // }
      }, 0);
   };

   const shareDataMutation = useMutation(shareData, {
      onSuccess(data, variables, context) {},
      onError(error, variables, context) {},
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
                                 <div
                                    key={dept.id}
                                    className="flex items-center gap-3 mb-3"
                                 >
                                    <input
                                       type="checkbox"
                                       name={dept.name}
                                       id={dept.id}
                                       checked={isShared(dept)}
                                       onChange={(e) => handleDataShare(e, dept)}
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
                                 <div
                                    key={dept.id}
                                    className="flex items-center gap-3 mb-3"
                                 >
                                    <input
                                       type="checkbox"
                                       name={dept.name}
                                       id={dept.id}
                                       checked={isSharing(dept)}
                                       className="cursor-not-allowed"
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
