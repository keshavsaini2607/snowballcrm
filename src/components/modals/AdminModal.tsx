import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GrFormClose } from "react-icons/gr";
import { BsInfo } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

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
   p: 4,
   borderTopLeftRadius: "10px",
};

interface props {
   open: boolean;
   handleClose: () => void;
   children: any;
}

const AdminModal = ({ open, handleClose, children }: props) => {
   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         disableAutoFocus={true}
      >
         <Box sx={style}>
            <div className="flex items-center gap-3">
               <GrFormClose width={40} height={40} />
               <IoIosSave width={40} height={40} />
               <BsInfo width={40} height={40} />
            </div>

            <div>{children}</div>
         </Box>
      </Modal>
   );
};

export default AdminModal;
