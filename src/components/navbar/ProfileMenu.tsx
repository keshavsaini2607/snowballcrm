import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AiFillCaretDown } from "react-icons/ai";
import { useQuery } from "react-query";
import { signout } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
   const navigate = useNavigate();
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const logout = async () => {
      const response = await signout();
      if (response) {
         localStorage.removeItem('access_token');
         handleClose();
         navigate('/');
      }
   };

   return (
      <div>
         <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
         >
            John Mathew <AiFillCaretDown />
         </Button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
         >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
         </Menu>
      </div>
   );
};

export default ProfileMenu;
