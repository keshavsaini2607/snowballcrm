import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddColumn from "./Features/AddColumn";

interface props {
   open: boolean;
   handleClose: () => void;
   featureToAdd: string | any;
}

const style = {
   position: "absolute" as "absolute",
   top: "20%",
   right: "0",
   width: "40%",
   bgcolor: "#fff",
   borderRadius: 3,
   boxShadow: 24,
   px: 2,
   py: 1.5,
   borderLeft: "4px solid #f87315",
   minHeight: "40%"
};

const AddFeatureModal = ({ open, handleClose, featureToAdd }: props) => {

   function getModalContent() {
      switch(featureToAdd) {
         case "Add Column":
            return <AddColumn handleClose={handleClose} />
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
            <h1 className="text-xl border-b-[1px] text-gray-700">Create User Attribute</h1>
            <div>{getModalContent()}</div>
         </Box>
      </Modal>
   );
};

export default AddFeatureModal;
