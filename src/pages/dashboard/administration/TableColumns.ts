import { Column } from "react-table";
import Explore from "./explore";

export const EMPTY_COLUMNS = [
   {
      Header: "Department and User",
      columns: [
         {
            Header: "Add Column",
            Cell: Explore,
         },
      ],
   },
];

export const COLUMNS = [
   {
      Header: "Department and User",
      sticky: "left",
      columns: [
         {
            Header: "Department",
            accessor: "department_name",
            Cell: Explore,
         },
         {
            Header: "User",
            accessor: "user",
         },
         {
            Header: "Email",
            accessor: "username",
         },
      ],
   },

   {
      Header: "User Details",
      columns: [
         // {
         //    Header: "Add Column",
         //    // Cell: Explore,
         // },
      ],
   },
];
