import React, { useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import AdminModal from "../../../../components/modals/AdminModal";
import Consultant from "./Consultant";
import Department from "./Department";

const Explore = ({ cell }: any) => {
   const [showExplore, setShowExplore] = useState(false);
   const [showModal, setShowModal] = useState(false);

   function getContentFile() {
      switch (cell.column.Header) {
         case "Department":
            return <Department cell={cell} />;

         case "First Name":
            return <Consultant cell={cell} />

         default: {
            return <h1>Something went wrong</h1>;
         }
      }
   }

   return (
      <div
         className="flex items-center justify-between h-max overflow-hidden"
         onMouseOver={() => setShowExplore(true)}
         onMouseOut={() => setShowExplore(false)}
      >
         <span>{cell.value}</span>
         <span
            className="cursor-pointer flex items-center text-center flex-col h-[100%] relative p-[5px]"
            onClick={() => setShowModal((p) => !p)}
         >
            <AiOutlineExpandAlt />
            {showExplore && <span className="text-[0.5rem] absolute -bottom-[5px] right-1">Open</span>}
         </span>
         <AdminModal
            open={showModal}
            handleClose={() => {
               setShowModal(false);
               setShowExplore(false);
            }}
            cell={cell}
         >
            {getContentFile()}
         </AdminModal>
      </div>
   );
};

export default Explore;
