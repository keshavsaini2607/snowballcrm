import React, { useEffect, useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdError } from "react-icons/md";
import Explore from "../../pages/dashboard/administration/explore";
import { useMutation, useQuery } from "react-query";
import { saveUserAttribute } from "../../api/users";
import { getUserAttributes } from "../../api/userAttributes";

const UserCell = ({ cell, row }: any) => {
   const [error, setError] = useState(false);
   const [cellValue, setCellValue] = useState("");
   const [hover, setHover] = useState(false);
   const { data, isLoading } = useQuery("userAttribtues", getUserAttributes);

   function getUserName(userAttributes: any[]) {
      let name = "";
      userAttributes.forEach((attr: any) => {
         if (attr.attribute_id === 1) {
            name = attr.value;
         }
      });
      return name;
   }

   

   useEffect(() => {
      let userName = getUserName(row.original.user_attributes);
      setCellValue(userName);
   }, [cell]);
   
   return (
      <div
         className="relative flex items-center pr-1"
         onMouseOver={() => setHover(true)}
         onMouseOut={() => setHover(false)}
      >
         <input
            className="w-[100%] px-2 py-1 bg-white"
            value={cellValue}
            name={cell?.column?.Header}
            disabled
         />

         <Explore cell={cell} hover={hover} user={getUserName(row.original.user_attributes)} />
      </div>
   );
};

export default UserCell;
