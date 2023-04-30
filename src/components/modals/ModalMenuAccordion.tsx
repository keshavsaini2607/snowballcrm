import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { handleUnderscore } from "../../utils/helpers";
import { useQuery } from "react-query";
import { getActivityAccess } from "../../api/types";

let iconStyle = {
   border: "1px solid gray",
   borderRadius: "50%",
   width: "20px",
   height: "20px",
   padding: "2px",
};

const ModalMenuAccordion = ({ data }: any) => {
   const [expanded, setExpanded] = useState(false);
   const { data: activityAccess } = useQuery(
      "activityAccess",
      getActivityAccess
   );

   function getOptions(headerName: string) {
      let resArr: any[] = [];

      if (activityAccess && activityAccess instanceof Array) {
         activityAccess.forEach((activity: any) => {
            if (activity.parent_name === headerName) {
               resArr.push(activity.child_name);
            }
         });
      }

      return resArr;
   }

   return (
      <div className="relative">
         <div
            className="flex items-center gap-2 cursor-pointer w-max"
            onClick={() => setExpanded((p) => !p)}
         >
            <span className="">
               {!expanded ? (
                  <AiOutlineRight style={iconStyle} />
               ) : (
                  <AiOutlineDown style={iconStyle} />
               )}
            </span>
            <span className="text-sm">{handleUnderscore(data)}</span>
            <span className="text-green-500 text-sm">Full Access</span>
         </div>
         {expanded && (
            <div className={`ml-8 text-sm`}>
               {getOptions(data).map((option: any) => (
                  <span className="flex items-center gap-3 mt-2">
                     <input type="checkbox" name="Read" id="Read" />
                     <label htmlFor="Read">{handleUnderscore(option)}</label>
                  </span>
               ))}
            </div>
         )}
      </div>
   );
};

export default ModalMenuAccordion;
