import React from "react";

const Leads = () => {
   return (
      <div className=" pr-4">
         <header className="flex flex-col md:flex-row items-center gap-3 md:gap-10 border-b-[1px] py-6 border-b-gray-300">
            <h1 className="text-2xl md:text-4xl font-bold">Leads</h1>
            <div className="flex items-center gap-10">
               <span className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-blue-500">0</span>
                  <span className="text-xs md:text-sm">Total leads</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <span className="text-xs md:text-sm">Successful leads</span>
               </span>
               <span className="flex flex-col items-center ">
                  <span className="text-2xl font-bold text-red-600">0</span>
                  <span className="text-xs md:text-sm">Unsuccessful leads</span>
               </span>
            </div>
         </header>
      </div>
   );
};

export default Leads;
