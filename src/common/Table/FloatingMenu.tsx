import React, { useState } from "react";
import { GrUpload } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import DeleteModal from "../Modals/DeleteModal";

interface props {
   selectedFlatRows: any;
}

const FloatingMenu = ({ selectedFlatRows }: props) => {
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   return (
      <div className="flex gap-20 items-center  shadow-md p-2 border-[1px] w-max border-l-[3px] border-l-[#f87315] rounded-tl-md rounded-bl-md mt-4">
         <span>
            {selectedFlatRows.length} User
            {selectedFlatRows.length > 1 ? "s" : ""} Selected
         </span>
         <div className="flex items-center gap-10">
            <Tooltip title="Export">
               <IconButton>
                  <GrUpload className="cursor-pointer hover:scale-125 w-[20px] h-[20px] " />
               </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
               <IconButton onClick={() => setShowDeleteModal(true)}>
                  <MdDelete className="cursor-pointer hover:scale-125 w-[20px] h-[20px] " />
               </IconButton>
            </Tooltip>
            <Tooltip title="Duplicate">
               <IconButton>
                  <IoCopyOutline className="cursor-pointer hover:scale-125 w-[20px] h-[20px] " />
               </IconButton>
            </Tooltip>
         </div>
         <DeleteModal
            open={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            entries={selectedFlatRows.length}
         />
      </div>
   );
};

export default FloatingMenu;
