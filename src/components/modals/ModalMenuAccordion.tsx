import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

let iconStyle = {
   border: "1px solid gray",
   borderRadius: "50%",
   width: "20px",
   height: "20px",
   padding: "2px",
};

const ModalMenuAccordion = () => {
   const [expanded, setExpanded] = useState(false);

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
            <span className="text-sm">Client Access</span>
            <span className="text-green-500 text-sm">Full Access</span>
         </div>
         {expanded && (
            <div className={`ml-8 text-sm`}>
               <span className="flex items-center gap-3 mt-2">
                  <input type="checkbox" name="Read" id="Read" />
                  <label htmlFor="Read">Read</label>
               </span>
               <span className="flex items-center gap-3 mt-2">
                  <input type="checkbox" name="Read" id="Read" />
                  <label htmlFor="Read">Write</label>
               </span>
               <span className="flex items-center gap-3 mt-2">
                  <input type="checkbox" name="Read" id="Read" />
                  <label htmlFor="Read">Delete</label>
               </span>
            </div>
         )}
      </div>
   );
};

export default ModalMenuAccordion;
