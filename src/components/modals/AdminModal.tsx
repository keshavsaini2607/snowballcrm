import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { BsInfo } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import ModalMenuAccordion from "./ModalMenuAccordion";
import ConsultantMenu from "./ConsultantMenu";

const style = {
   position: "absolute" as "absolute",
   bottom: "0",
   right: "0",
   width: "70%",
   height: "90%",
   bgcolor: "#fff",
   borderLeft: "10px solid #ef7d30",
   borderTop: "3px solid #ef7d30",
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

const AdminModal = ({ open, handleClose, children, cell }: props) => {
   
   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         disableAutoFocus={true}
      >
         <Box sx={style}>
            <div className="flex items-center gap-10 w-[100%]">
               <div className="flex items-center">
                  <Tooltip title="close">
                     <IconButton onClick={handleClose}>
                        <IoClose
                           color="#fd0000"
                           style={{
                              color: "#fd0000",
                              border: "2px solid red",
                              ...commonStyles,
                           }}
                        />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="save">
                     <IconButton>
                        <IoIosSave
                           style={{
                              border: "2px solid #279d00",
                              color: "#279d00",
                              ...commonStyles,
                           }}
                        />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="info">
                     <IconButton>
                        <BsInfo
                           style={{
                              border: "2px solid #fec000",
                              color: "#fec000",
                              ...commonStyles,
                           }}
                        />
                     </IconButton>
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
