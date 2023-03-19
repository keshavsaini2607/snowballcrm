import { Column } from "react-table";

export const COLUMNS = [
   {
      Header: "Department and User",
      sticky: "left",
      columns: [
         {
            Header: "Department",
            accessor: "department_name",
         },
         {
            Header: "First Name",
            accessor: "user_attributes[2].value",
         },
         {
            Header: "Last Name",
            accessor: "user_attributes[4].value",
         },
      ],
   },
   {
      Header: "Email",
      accessor: "user_attributes[1].value",
   },
   {
      Header: "Mobile",
      accessor: "user_attributes[5].value",
   },
   {
      Header: "Activity Access",
      columns: [
         {
            Header: "Client Read",
            accessor: "activity_access[1].status",
         },
         {
            Header: "Client Create",
            accessor: "activity_access[2].status",
         },
         {
            Header: "Client Delete",
            accessor: "activity_access[3].status",
         },
         {
            Header: "Client Management",
            accessor: "activity_access[4].status",
         },
         {
            Header: "Form Create",
            accessor: "activity_access[5].status",
         },

         {
            Header: "Form Use",
            accessor: "activity_access[6].status",
         },

         {
            Header: "Form Management",
            accessor: "activity_access[7].status",
         },
         {
            Header: "Lead Create",
            accessor: "activity_access[8].status",
         },
         {
            Header: "Lead Delete",
            accessor: "activity_access[9].status",
         },
         {
            Header: "Lead Forward",
            accessor: "activity_access[10].status",
         },
         {
            Header: "Lead Management",
            accessor: "activity_access[11].status",
         },
      ],
   },
   {
      Header: "Forms Access",
      columns: [
         {
            Header: "Fact Find Form",
            accessor: "form_access[1].status",
         },
         {
            Header: "Purchaser Information Form",
            accessor: "form_access[2].status",
         },
         {
            Header: "Vendor Information Form",
            accessor: "form_access[3].status",
         },
         {
            Header: "Client Information Form",
            accessor: "form_access[4].status",
         },
         {
            Header: "Individual Tax Return",
            accessor: "form_access[5].status",
         },
      ],
   },
];
