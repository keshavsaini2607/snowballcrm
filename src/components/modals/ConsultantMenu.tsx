import React, { useState } from "react";
import ModalMenuAccordion from "./ModalMenuAccordion";
import { useQuery } from "react-query";
import { getActivityAccess } from "../../api/types";

const accessObject: any = [
   "Client_Access",
   "Form_Access",
   "Lead_Access",
   "Marketing_Access",
   "Document_Access",
   "Client_onboarding_access",
   "Department_view_access",
   "User_access",
   "Access_control",
   "Form_field_access",
   "Export_access",
   "Progress_view_access",
   "Email_Notification",
   "lead_board",
];

const ActivityAccess = () => {
   return (
      <div className="px-8 py-4 grid grid-cols-2 gap-x-20 gap-y-4 scroll-important h-[30%]">
         {accessObject.map((da: string) => (
            <ModalMenuAccordion data={da} />
         ))}
      </div>
   );
};

const LeadAccess = () => {
   return <></>;
};

const ConsultantMenu = () => {
   const [activeHeader, setActiveHeader] = useState("activity");
   
   function renderContent() {
      switch (activeHeader) {
         case "activity":
            return <ActivityAccess />;

         case "lead":
            return <LeadAccess />;
      }
   }

   return (
      <div>
         <nav className="border-b-[1px] border-t-gray-300 w-[90%] mx-auto">
            <div className="w-auto pr-10 flex items-end justify-end text-sm gap-8">
               <span
                  className={`text-gray-300 ${
                     activeHeader === "activity" &&
                     "font-extrabold text-gray-900"
                  } cursor-pointer`}
                  onClick={() => setActiveHeader("activity")}
               >
                  ACTIVITY ACCESS
               </span>
               <span
                  className={`text-gray-300 ${
                     activeHeader === "lead" && "font-extrabold text-gray-900"
                  } cursor-pointer`}
                  onClick={() => setActiveHeader("lead")}
               >
                  LEAD ATTRIBUTE ACCESS
               </span>
               <span
                  className={`text-gray-300 ${
                     activeHeader === "user" && "font-extrabold text-gray-900"
                  } cursor-pointer`}
                  onClick={() => setActiveHeader("user")}
               >
                  USER ATTRIBUTE ACCESS
               </span>
            </div>
         </nav>
         <div>{renderContent()}</div>
      </div>
   );
};

export default ConsultantMenu;
