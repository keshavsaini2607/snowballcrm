import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BsInfo } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import ModalMenuAccordion from "./ModalMenuAccordion";
import ConsultantMenu from "./ConsultantMenu";
import { useEffect, useState } from "react";

const style = {
   position: "absolute" as "absolute",
   top: "10%",
   right: "0",
   width: "70%",
   height: "80%",
   bgcolor: "#fff",
   borderLeft: "10px solid #ef7d30",
   borderTop: "3px solid #ef7d30",
   borderBottom: "3px solid #ef7d30",
   boxShadow: 24,
   borderTopLeftRadius: "10px",
};

interface props {
   open: boolean;
   handleClose: () => void;
   children: any;
   cell: any;
}

let commonStyles = {
   fontSize: "18px",
   fontWeight: "800",
   borderRadius: "10px",
   width: "30px",
   cursor: "pointer",
};

const Icon = ({ iconName }: any) => {
   const [hovered, setHovered] = useState(false);
   const [icon, setIcon] = useState(iconName);

   useEffect(() => {
      if (hovered) {
         setIcon(iconName + "-fill");
      } else {
         setIcon(iconName);
      }
   }, [hovered]);
   return (
      <img
         src={`/assets/modal/${icon}.svg`}
         onMouseOver={() => setHovered(true)}
         onMouseOut={() => setHovered(false)}
      />
   );
};


const AdminModal = ({ open, handleClose, children, cell }: props) => {
   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         disableAutoFocus={true}
         hideBackdrop
      >
         <Box sx={style}>
            <div className="flex items-center gap-10 w-[100%]">
               <div className="flex items-center">
                  <Tooltip title="close" componentsProps={{
                        tooltip: {
                           sx: {
                              bgcolor: "common.white",
                              color: "common.black",
                              padding: 0,
                              margin: 0
                           },
                        },
                     }}>
                     <div onClick={handleClose} className="mx-2 cursor-pointer">
                        <Icon iconName="close" />
                     </div>
                  </Tooltip>
                  <Tooltip title="save" componentsProps={{
                        tooltip: {
                           sx: {
                              bgcolor: "common.white",
                              color: "common.black",
                              padding: 0,
                              margin: 0
                           },
                        },
                     }}>
                     <div className="mx-2 cursor-pointer" >
                        <Icon iconName="save" />
                     </div>
                  </Tooltip>
                  <Tooltip
                     title="info"
                     componentsProps={{
                        tooltip: {
                           sx: {
                              bgcolor: "common.white",
                              color: "common.black",
                              padding: 0,
                              margin: 0
                           },
                        },
                     }}
                  >
                     <div className="mx-2 cursor-pointer">
                        <Icon iconName="info" />
                     </div>
                  </Tooltip>
               </div>

               <div className="flex items-center gap-10">
                  <h1 className="text-lg font-extrabold">
                     {cell?.column?.Header === "Department"
                        ? "Department details"
                        : "Consultant details"}
                  </h1>
                  <div className="bg-[url('/admin-modal-header-back.svg')] px-10 flex items-center gap-10">
                     <h2 className="text-white font-extrabold">
                        {cell?.value}
                     </h2>
                     <input
                        type="text"
                        name={`Department alias`}
                        id=""
                        placeholder={`${
                           cell?.column?.Header === "Department"
                              ? "Department"
                              : "User"
                        } alias`}
                        className="ml-20 border-[1px] border-gray-400 rounded-md text-sm px-3 outline-none"
                     />
                  </div>
               </div>
            </div>

            <div className="px-8 pt-8">{children}</div>
            {cell?.column?.Header === "First Name" && (
               <div>
                  <ConsultantMenu />
               </div>
            )}
         </Box>
      </Modal>
   );
};

export default AdminModal;
