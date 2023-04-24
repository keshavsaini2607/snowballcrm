import React, { useEffect, useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdError } from "react-icons/md";
import Explore from "../../pages/dashboard/administration/explore";
import { useMutation, useQuery } from "react-query";
import { saveUserAttribute } from "../../api/users";
import { getUserAttributes } from "../../api/userAttributes";

const CellInput = ({ cell }: any) => {
   const [error, setError] = useState(false);
   const [cellValue, setCellValue] = useState("");
   const [hover, setHover] = useState(false);
   const { data, isLoading } = useQuery("userAttribtues", getUserAttributes);

   const handleInputBlur = (event: any) => {
      event.preventDefault();
      
      
      let isUserAttr = data.find(
         (item: any) => item.name === event.target.name
      );
      let payload: any;
      if (isUserAttr) {
         payload = [
            {
               is: isUserAttr?.id,
               attribute_id: isUserAttr?.attribute_type_id,
               value: event?.target?.value,
            },
         ];

         saveUserMutation.mutate(payload);
      }
   };

   const saveUserMutation = useMutation(saveUserAttribute, {
      onSuccess(data, variables, context) {
         
      },
      onError(error, variables, context) {
         
      },
   });

   useEffect(() => {
      setCellValue(cell.value);
   }, [cell]);
   return (
      <div
         className="relative flex items-center pr-1"
         onMouseOver={() => setHover(true)}
         onMouseOut={() => setHover(false)}
      >
         <input
            className="w-[100%] px-2 py-1"
            value={cellValue}
            name={cell?.column?.Header}
            onChange={(e) => setCellValue(e.target.value)}
            onBlur={(e) => handleInputBlur(e)}
            disabled={cell.column.Header === "Full Name" ? true : false}
         />

         {cell?.column?.Header === "Department" && (
            <Explore cell={cell} hover={hover} />
         )}
         {cell?.column?.Header === "User" && (
            <Explore cell={cell} hover={hover} />
         )}
         {error && (
            <span className="absolute right-2 top-[25%] text-red-500">
               <MdError />
            </span>
         )}
      </div>
   );
};

export default CellInput;
