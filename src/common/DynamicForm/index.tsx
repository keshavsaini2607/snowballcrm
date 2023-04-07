import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
// import Button from "../Common/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInterface } from "../../utils/interface";

type props = {
   data: FormInterface;
   submit: (formData: any) => void;
   btnText: string;
   schema?: any;
   formRef?: any;
};

const DynamicForm = ({ data, submit, btnText, schema, formRef }: props) => {
   const {
      control,
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
   } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

   const renderController = (formField: any) => {
      switch (formField.controlType) {
         case "text":
            return (
               <div className="flex flex-col">
                  <input
                     {...register(formField.key, { required: true })}
                     className={`bg-[#f6f6f6] px-2 py-3 border-[#dffcf2] rounded-md text-sm outline-none border-2`}
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
         case "textarea":
            return (
               <textarea {...register(formField.key, { required: true })} />
            );
         case "password":
            return (
               <div className="flex flex-col">
                  <input
                     {...register(formField.key, { required: true })}
                     className="bg-[#f6f6f6] px-2 py-3 border-[#dffcf2] rounded-md text-sm outline-none border-2"
                     placeholder={formField.placeholder || formField.label}
                     type="password"
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

         case "checkbox":
            return (
               <div className="flex items-center gap-4">
                  <input type="checkbox" />
                  <p>
                     I agree to the{" "}
                     <span className="underline cursor-pointer">
                        Terms of Service
                     </span>{" "}
                     and{" "}
                     <span className="underline cursor-pointer">
                        Privacy Policy
                     </span>
                     .
                  </p>
               </div>
            );
      }
   };

   return (
      <div>
         <form onSubmit={handleSubmit(submit)} ref={formRef}>
            {data.formFields.map((formField: any) => (
               <div
                  className="flex flex-col w-[100%] my-4"
                  key={formField.key}
                  style={{ width: "100%", textAlign: "start" }}
               >
                  <label className="text-[#065743] text-sm">
                     {formField.label}
                  </label>
                  {renderController(formField)}
               </div>
            ))}
            <div>
               {/* <Button title={isSubmitting ? "Please wait..." : btnText} click={() => {}} /> */}
               <button className="bg-primary px-16 py-4 text-sm text-white w-full mt-4">
                  {isSubmitting ? "Please Wait..." : btnText}
               </button>
            </div>
         </form>
      </div>
   );
};

export default DynamicForm;
