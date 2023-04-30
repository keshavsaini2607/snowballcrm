import React from "react";
import { departmentDataSharing } from "../../../../utils/constants";

const Consultant = ({ cell, user }: any) => {
   return (
      <div>
         <div className="w-[100%] py-2 pb-10">
            <div className="flex items-start justify-between w-[90%] text-sm ">
               <div className="grid grid-cols-3 items-start gap-3 mt-4">
                  <span>Created: 12/02/2023</span>
                  <span>Updated: 12/02/2023</span>
                  <div className="flex items-start gap-1 relative">
                     <span className="">{user ?? cell?.value}'s Department: </span>
                     <div className="flex flex-col absolute right-1 text-sm text-gray-600">
                        <span>Accounting</span>
                        <span>Tax</span>
                        <span>Loan</span>
                        <span>Engineering</span>
                     </div>
                  </div>
                  <span>DOB: 12/02/2023</span>
                  <span className="w-[70%]">
                     Address: 12th Therry St. Reservoir, VIC - 3073
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Consultant;
