import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { deleteUser } from "../../api/users";
import { DeleteUserPayload } from "../../api/users/types";
import { QueryClient } from "react-query";

interface props {
   open: boolean;
   handleClose: () => void;
   entries: number;
   selectedRows: any;
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
   py: 1.5
};

const DeleteModal = ({ open, handleClose, entries, selectedRows }: props) => {
   const queryClient = new QueryClient();
   const handleDelete = () => {
      if(selectedRows && selectedRows instanceof Array) {
         selectedRows.forEach(async (row) => {
            let payload: DeleteUserPayload = {
               user_id: row.original.id,
               department_id: row.original.department_id
            }
            await deleteUser(payload);
            handleClose();
         })
      }
   }
   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Are you sure
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               You want to delete {entries} record{entries > 1 ? "s" : ""}
            </Typography>
            <div className="w-full flex items-center justify-end mt-4 gap-4">
               <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
               <Button variant="contained" onClick={handleClose}>Cancel</Button>
            </div>
         </Box>
      </Modal>
   );
};

export default DeleteModal;
