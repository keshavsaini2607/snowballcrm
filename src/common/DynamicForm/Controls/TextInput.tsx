import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface props {
   formField: any;
   registerFunc: UseFormRegister<FieldValues>;
   errors: FieldErrors<FieldValues>;
}

const TextInput: React.FC<props> = ({ formField, registerFunc, errors }) => {
   return (
      <div className="flex flex-col">
         <input
            {...registerFunc(formField.key, { required: true })}
            className={`bg-[#f6f6f6] px-2 py-3  rounded-md text-sm outline-none border-2`}
            placeholder={formField.placeholder || formField.label}
         />
         <>
            {Object.entries(errors).map(([key, value]) => {
               if (key === formField.key) {
                  return (
                     <span
                        key={Math.random().toString()}
                        className="text-red-700 text-xs capitalize"
                     >{`${formField.label} ${value?.message}`}</span>
                  );
               }
            })}
         </>
      </div>
   );
};

export default TextInput;
