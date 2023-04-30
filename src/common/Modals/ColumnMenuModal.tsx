import { Button, MenuItem, MenuList, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { QueryClient } from "react-query";
import { columnMenu } from "../../utils/constants";
import { useEffect, useState } from "react";

interface props {
   open: boolean;
   handleClose: () => void;
   column: any;
}

const style = {
   position: "absolute" as "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "#fff",
   borderRadius: 3,
   boxShadow: 24,
   px: 2,
   py: 1.5,
};

const ColumnMenuModal = ({ open, handleClose, column }: props) => {
   const queryClient = new QueryClient();
   const [showRename, setShowRename] = useState(false);
   const [name, setName] = useState("");
   const [isDeleting, setIsDeleting] = useState(false);

   

   useEffect(() => {
      if (column) {
         setName(column.Header);
      }
   }, [column]);

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <h1 className="text-xl font-bold text-[#717171]">Column Settings</h1>
            <div>
               {showRename && !isDeleting && (
                  <div className="mt-3 w-full flex justify-between">
                     <input
                        type="text"
                        name="column_name"
                        id="column_name"
                        className="border-[1px] w-[75%] px-2 py-1 outline-none"
                        placeholder="Column Name"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                     />
                     <button className="bg-gray-200 py-1 mx-3 text-gray-700 px-2">
                        Update
                     </button>
                  </div>
               )}
               {!isDeleting && (
                  <div
                     className={`flex items-center gap-6 text-[#a2a0a0] ${
                        !showRename ? "mt-4" : "mt-2"
                     }`}
                  >
                     <div
                        className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-3 rounded-lg ${
                           showRename && "bg-gray-100"
                        }`}
                        onClick={() => setShowRename((p) => !p)}
                     >
                        <img src="/admin/rename.svg" alt="rename" />
                        <p>Rename</p>
                     </div>
                     {/* <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-3 rounded-lg">
                     <img src="/admin/sort.svg" alt="rename" />
                     <p>Sort</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-3 rounded-lg">
                     <img src="/admin/duplicate.svg" alt="rename" />
                     <p>Duplicate</p>
                  </div> */}
                     <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-3 rounded-lg" onClick={() => setIsDeleting(true)}>
                        <img src="/admin/delete.svg" alt="rename" />
                        <p>Delete</p>
                     </div>
                  </div>
               )}
               {isDeleting && (
                  <div className="mt-2">
                     <p className="text-[#717171]">Are you sure you want to delete {column?.Header}</p>
                     <div className="mt-4">
                        <button className="bg-gray-200 py-1 text-gray-700 px-2">
                           Delete
                        </button>
                        <button className="bg-gray-200 py-1 mx-3 text-gray-700 px-2" onClick={() => setIsDeleting(false)}>
                           Cancel
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </Box>
      </Modal>
   );
};

export default ColumnMenuModal;
