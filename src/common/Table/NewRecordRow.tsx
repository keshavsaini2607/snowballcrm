import React, { FormEvent } from "react";
import "./TableStyles";

const newRecordCols: any[] = [
   {
      id: "0",
      type: "text",
      disabled: true,
   },
   {
      id: "1",
      key: "Department",
      type: "text",
   },
   {
      id: "2",
      key: "First Name",
      type: "text",
   },
   {
      id: "3",
      key: "Last Name",
      type: "text",
   },
   {
      id: "4",
      key: "Email",
      type: "email",
   },
   {
      id: "5",
      key: "Mobile Read",
      type: "phone",
   },
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
}

const NewRecordRow = ({createNewRowRef}: props) => {
   const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
      const form: any = e.target;
      const formData = new FormData(form);
      const formValues = Object.fromEntries(formData.entries());
      console.log({ formValues });
   };

   return (
      <form className="w-[100vw] flex items-center" onSubmit={handleFormSubmit}>
         {newRecordCols?.map((column) => {
            if (column.type === "text" || column.type === "email") {
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
         })}
         <button ref={createNewRowRef} type="submit" style={{ display: 'none' }} />
      </form>
   );
};

export default NewRecordRow;
