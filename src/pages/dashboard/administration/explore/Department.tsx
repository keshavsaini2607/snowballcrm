import React from "react";
import { departmentDataSharing } from "../../../../utils/constants";

const Department = ({ cell }: any) => {
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
            <div className="flex items-start justify-between mt-5">
               <div>
                  <h2 className="mb-3">
                     <span className="text-primary">{cell?.value}</span>{" "}
                     department sharing data with
                  </h2>
                  {departmentDataSharing.map((type) => (
                     <>
                        {type !== cell?.value && (
                           <div className="flex items-center gap-3 mb-3">
                              <input type="checkbox" name={type} id={type} />
                              <span>{type}</span>
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
                  {departmentDataSharing.map((type) => (
                     <>
                        {type !== cell?.value && (
                           <div className="flex items-center gap-3 mb-3">
                              <input type="checkbox" name={type} id={type} />
                              <span>{type}</span>
                           </div>
                        )}
                     </>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Department;
