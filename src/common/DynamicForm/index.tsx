import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
// import Button from "../Common/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInterface } from "../../utils/interface";
import { Autocomplete} from "@mui/material";
import Dropdown from "./Controls/Dropdown";
import PasswordInput from "./Controls/PasswordInput";
import TextInput from "./Controls/TextInput";
import Search from "./Controls/Search";


type props = {
   data: FormInterface;
   submit: (formData: any) => void;
   btnText: string;
   schema?: any;
   formRef?: any;
   loading?: boolean;
};

const DynamicForm = ({ data, submit, btnText, schema, formRef, loading }: props) => {
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
               <TextInput formField={formField} registerFunc={register} errors={errors} />
            );
         case "textarea":
            return (
               <textarea {...register(formField.key, { required: true })} />
            );
         case "password":
            return (
               <PasswordInput formField={formField} registerFunc={register} errors={errors} />
            );

         // case "autocomplete":
         //    return <Search />

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

         case "dropdown":
            return <Dropdown formField={formField} registerFunc={register} errors={errors} />;

         default:
            return <span>Please give a control type</span>;
      }
   };

   return (
      <div>
         <form onSubmit={handleSubmit(submit)} ref={formRef}>
            {data.formFields &&
               data.formFields.map((formField: any) => (
                  <>
                     {formField?.multiFields ? (
                        <div className="flex items-center gap-2">
                           {formField?.multiFields?.map((field: any) => (
                              <div
                                 className="flex flex-col w-[49%]"
                                 key={formField.key}
                              >
                                 {field?.controlType !== "dropdown" && (
                                    <label className="text-gray-700 text-sm">
                                       {field.label}
                                    </label>
                                 )}
                                 {renderController(field)}
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div
                           className="flex flex-col w-[100%] my-4"
                           key={formField.key}
                           style={{ width: "100%", textAlign: "start" }}
                        >
                           {formField?.controlType !== "dropdown" && (
                              <label className="text-gray-700 text-sm">
                                 {formField.label}
                              </label>
                           )}
                           {renderController(formField)}
                        </div>
                     )}
                  </>
               ))}
            <div>
               {/* <Button title={isSubmitting ? "Please wait..." : btnText} click={() => {}} /> */}
               <button className="bg-primary px-16 py-2 text-sm text-white mt-4">
                  {(isSubmitting || loading) ? "Please Wait..." : btnText}
               </button>
            </div>
         </form>
      </div>
   );
};

export default DynamicForm;
