import React, { FormEvent, useEffect } from "react";
import "./TableStyles";
import { getUserAttributes } from "../../api/userAttributes";
import { useQuery } from "react-query";
import Search from "../DynamicForm/Controls/Search";

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
      key: "Email",
      type: "text",
   },
   {
      id: "3",
      key: "Name",
      type: "text",
   },
];

const newRecordCols: any[] = [];
const defaultRecordCols = [
   {
      id: "6",
      key: "Client Read",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "7",
      key: "Client Create",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "8",
      key: "Client Delete",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "9",
      key: "Client Management",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "10",
      key: "Form Create",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "11",
      key: "Form Use",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "12",
      key: "Form Management",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "13",
      key: "Lead Create",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "14",
      key: "Lead Delete",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "15",
      key: "Lead Forward",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "16",
      key: "Lead Management",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "17",
      key: "Fact Find Form",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "18",
      key: "Purchaser Information Form",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "19",
      key: "Vendor Information Form",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "20",
      key: "Client Information Form",
      type: "select",
      options: ["Yes", "No"],
   },
   {
      id: "21",
      key: "Individual Tax Return",
      type: "select",
      options: ["Yes", "No"],
   },
];

type props = {
   createNewRowRef: any;
   isNewTable?: boolean;
};

const NewRecordRow = ({ createNewRowRef, isNewTable }: props) => {
   const { data: userAttributes, isLoading: userAttributeLoading } = useQuery(
      "userAttributes",
      getUserAttributes
   );

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

   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
      const form: any = e.target;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
   };

   const renderControl = (column: any) => {
      if (column.type === "autocomplete") {
         return <Search column={column} />;
      } else if (column.type === "text" || column.type === "email") {
         return (
            <input
               type={column.type}
               placeholder={column.key}
               name={column.key}
               className={`input w-[100px] ${
                  column.disabled && "cursor-not-allowed"
               }`}
               disabled={column?.disabled || false}
            />
         );
      } else {
         return (
            <select
               className="selInput w-[180px]"
               name={column.key}
               defaultValue={column.key}
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
