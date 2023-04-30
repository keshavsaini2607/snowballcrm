import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./TableStyles";
import {
   getAllActivityAccessTypes,
   getUserAttributes,
} from "../../api/userAttributes";
import { useMutation, useQuery } from "react-query";
import Search from "../DynamicForm/Controls/Search";
import { getAttributeTypes } from "../../api/userAttributes";
import { handleUnderscore } from "../../utils/helpers";
import { CreateUserPayload } from "../../api/users/types";
import { getDepartments } from "../../api/departments";
import { createUser, saveUserAttribute } from "../../api/users";

const defaultCols: any[] = [
   {
      id: "0",
      type: "text",
      disabled: true,
   },
   {
      id: "1",
      key: "Department",
      type: "autocomplete",
   },
   {
      id: "2",
      key: "Users",
      placeholder: "User",
      type: "text",
      disabled: true,
   },
   {
      id: "3",
      key: "Email",
      type: "text",
   },
];

const newRecordCols: any[] = [];
const defaultRecordCols: any[] = [];

type props = {
   createNewRowRef: any;
   isNewTable?: boolean;
};

const NewRecordRow = ({ createNewRowRef, isNewTable }: props) => {
   const [department, setDepartment] = useState("");
   const [email, setEmail] = useState("");

   const { data: userAttributes, isLoading: userAttributeLoading } = useQuery(
      "userAttributes",
      getUserAttributes
   );

   const { data: accessTypes, isLoading: accessLoading } = useQuery(
      "accessTypes",
      getAllActivityAccessTypes
   );

   const { data: departments, isLoading: departmentsLoading } = useQuery(
      "departments",
      getDepartments
   );

   //

   useEffect(() => {
      if (!accessLoading && accessTypes instanceof Array) {
         const accessObject: any = {
            Client_Access: [],
            Form_Access: [],
            Lead_Access: [],
            Marketing_Access: [],
            Document_Access: [],
            Client_onboarding_access: [],
            Department_view_access: [],
            User_access: [],
            Access_control: [],
            Form_field_access: [],
            Export_access: [],
            Progress_view_access: [],
            Email_Notification: [],
            lead_board: [],
         };

         accessTypes.forEach((access) => {
            accessObject[access.parent_name].push(access);
         });

         Object.entries(accessObject).map(([key, value]) => {
            // defaultRecordCols.push({
            //    id: Math.random().toString(),
            //    key: "Client Read",
            //    type: "select",
            //    options: ["Yes", "No"],
            // });
            if (value instanceof Array) {
               value.forEach((val) => {
                  let alreadyExists = defaultRecordCols.find(
                     (item) => item.key === handleUnderscore(val.child_name)
                  );
                  if (!alreadyExists) {
                     defaultRecordCols.push({
                        id: Math.random().toString(),
                        key: handleUnderscore(val.child_name),
                        type: "select",
                        options: ["Yes", "No"],
                     });
                  }
               });
            }
         });
      }
   }, [accessLoading, accessTypes]);

   useEffect(() => {
      userAttributes?.forEach((attribute: any) => {
         const entryExists = newRecordCols.find(
            (record) => record?.key === attribute?.name
         );
         if (!entryExists && attribute?.name !== "Add Column") {
            newRecordCols.push({
               id: Math.random().toString(),
               key: attribute.name,
               type: "text",
            });
         }
      });
      if (!newRecordCols[newRecordCols.length - 1]?.disabled) {
         newRecordCols.push({
            id: "1",
            key: "",
            type: "text",
            disabled: true,
         });
      }
   }, [userAttributes]);

   const saveUserMutation = useMutation(createUser, {
      onSuccess(data, variables, context) {},
      onError(error, variables, context) {},
   });

   const getDepartmentId = (departmentName: any) => {
      if (!departmentsLoading && departments instanceof Array) {
         for (let i = 0; i < departments.length; i++) {
            if (departments[i].name === departmentName) {
               return departments[i].id;
            }
         }
      }
      return null;
   };

   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
      const form: any = e.target;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());

      let payload = {
         username: formValues.Email,
         active: true,
         department_id: getDepartmentId(formValues.Department),
         user_role: formValues.Department,
         department_name: formValues.Department,
         activity_access: [],
         forms_access: [],
         lead_attributes_access: [],
         user_attributes: [],
         user_attributes_access: [],
      };

      saveUserMutation.mutate(payload);
   };

   function handleInputBlur(event: any) {
      if (event.target.name === "Department") {
         setDepartment(event.target.value);
      }

      if (event.target.name === "Email") {
         let username = event.target.value;
         let departmentId = getDepartmentId(department);
         if (departmentId) {
            let payload = {
               username: username,
               active: true,
               department_id: departmentId,
               user_role: department,
               department_name: department,
               activity_access: [],
               forms_access: [],
               lead_attributes_access: [],
               user_attributes: [],
               user_attributes_access: [],
            };

            saveUserMutation.mutate(payload);
         }
      }
   }

   function handleInputChange(event: any) {
      if (event.target.name === "First Name") {
         
         var inputElement: any = document.getElementsByName("Users")[0];
         inputElement.value = event.target.value;
      }
   }


   function handleSelectChange(event: any, column: any) {
      
      
   }

   const saveAttributeMutation = useMutation(saveUserAttribute, {
      onSuccess(data, variables, context) {
         
      },
      onError(error, variables, context) {
         
      },
   });

   const renderControl = (column: any) => {
      if (column.type === "autocomplete") {
         return (
            <Search
               column={column}
               name={column.key}
               onBlur={handleInputBlur}
            />
         );
      } else if (column.type === "text" || column.type === "email") {
         return (
            <input
               type={column.type}
               placeholder={column?.placeholder || column.key}
               name={column.key}
               className={`input w-[100px] ${
                  column.disabled && "cursor-not-allowed"
               }`}
               onBlur={(event) => handleInputBlur(event)}
               onChange={(event) => handleInputChange(event)}
               disabled={column?.disabled || false}
            />
         );
      } else {
         return (
            <select
               className="selInput w-[180px]"
               name={column.key}
               defaultValue={column.key}
               onChange={(event) => handleSelectChange(event, column)}
            >
               <option disabled>{column.key}</option>
               <option value="Yes">Yes</option>
               <option value="No">No</option>
            </select>
         );
      }
   };

   return (
      <form
         className={` ${
            isNewTable &&
            "border-l-[10px] border-l-primary max-w-[100vw] overflow-scroll"
         } `}
         onSubmit={handleFormSubmit}
      >
         <div className="flex items-center max-w-[100%] overflow-hidden">
            <div className="flex items-center">
               {defaultCols?.map((column) => renderControl(column))}
            </div>

            <div className="flex items-center">
               {newRecordCols?.map((column) => renderControl(column))}
            </div>

            <div className="flex items-center">
               {defaultRecordCols?.map((column) => renderControl(column))}
            </div>
         </div>

         <button
            ref={createNewRowRef}
            type="submit"
            style={{ display: "none" }}
         />
      </form>
   );
};

export default NewRecordRow;
