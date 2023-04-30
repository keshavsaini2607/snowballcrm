import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {
   createUserAttribute,
   getAttributeTypes,
} from "../../../api/userAttributes";
import { useMutation, useQuery } from "react-query";
import { CreateAttributeProps } from "../../../api/userAttributes/types";
import { handleUnderscore } from "../../../utils/helpers";

interface props {
   formField: any;
   registerFunc: UseFormRegister<FieldValues>;
   errors: FieldErrors<FieldValues>;
}

const Dropdown: React.FC<props> = ({ formField, registerFunc, errors }) => {
   const [selectedOption, setSelectedOption] = useState<any>();
   const { data, isLoading } = useQuery(
      "userAttributeTypes",
      getAttributeTypes
   );

   
   

   const formatTitle = (title: string) => {
      let newStr = title.includes("_") ? title.split("_").join(" ") : title;

      return newStr;
   };

   return (
      <div className="flex flex-col">
         <label className="text-gray-700 text-sm">{formField?.label}</label>
         <select
            {...registerFunc(formField.key, { required: true })}
            disabled={isLoading}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="border-2 bg-[#f6f6f6] border-[#e4e7eb] rounded-md py-3 px-1 text-sm cursor-pointer outline-none"
         >
            {data?.map((opt: any) => (
               <option disabled={opt?.name !== 'text_field'}>{handleUnderscore(opt?.name)}</option>
            ))}
         </select>
      </div>
   );
};

export default Dropdown;
