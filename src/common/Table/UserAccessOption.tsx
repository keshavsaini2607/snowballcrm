import React from "react";
import { handleUnderscore } from "../../utils/helpers";

const UserAccessOption = ({cell}: any) => {
   return (
      <select className="w-full px-2">
         <option>{handleUnderscore(cell?.column?.Header)}</option>
         <option>Yes</option>
         <option>No</option>
      </select>
   );
};

export default UserAccessOption;
