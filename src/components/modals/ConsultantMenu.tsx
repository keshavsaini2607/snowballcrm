import React, { useState } from "react";
import ModalMenuAccordion from "./ModalMenuAccordion";

const ActivityAccess = () => {
   return (
      <div className="px-8 py-4 grid grid-cols-2 gap-x-20 gap-y-4 scroll-important h-[30%]">
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
         <ModalMenuAccordion />
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
