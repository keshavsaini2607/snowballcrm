import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "react-query";
import { getDepartments } from "../../../api/departments";
import useAutocomplete from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";

const Label = styled("label")({
   display: "block",
});

const Input = styled("input")(({ theme }) => ({
   width: 200,
   backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
   color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
   width: 150,
   margin: 0,
   padding: 0,
   zIndex: 1,
   position: "absolute",
   listStyle: "none",
   backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
   overflow: "auto",
   maxHeight: 200,
   border: "1px solid rgba(0,0,0,.25)",
   "& li.Mui-focused": {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer",
   },
   "& li:active": {
      backgroundColor: "#2977f5",
      color: "white",
   },
}));

export default function Search() {
   const { isLoading, data, isError } = useQuery("departments", getDepartments);
   console.log({ data });
   const [options, setOptions] = React.useState<any[]>([]);
   const [inputFoccus, setInputFocus] = React.useState(false);
   const [inputValue, setInputValue] = React.useState("");

   const {
      getRootProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
   } = useAutocomplete({
      id: "use-autocomplete-demo",
      options: options,
      getOptionLabel: (option) => option,
   });

   React.useEffect(() => {
      if (!isError && data instanceof Array) {
         data.forEach((department: any) => {
            console.log({department})
            let alreadyExists = options.find(
               (item) => item === department.name
            );
            if (!alreadyExists) {
               setOptions([...options, department.name]);
            }
         });
      }
   }, [data]);

   console.log({ options });

   return (
      <div className="relative w-[150px]">
         <div>
            <div {...getRootProps()}>
               <Input
                  {...getInputProps()}
                  className="input"
                  placeholder="Department"
               />
            </div>
            {groupedOptions.length > 0 ? (
               <Listbox {...getListboxProps()}>
                  {(groupedOptions as typeof options).map((option, index) => (
                     <li {...getOptionProps({ option, index })} className="p-2">
                        {option}
                     </li>
                  ))}
               </Listbox>
            ) : null}

            {/* <button
               className={`absolute bg-white p-2 z-10 w-[150px] shadow-lg ${
                  !inputFoccus && groupedOptions.length <= 0 && "hidden"
               }`}
            >
               Create New
            </button> */}
         </div>
      </div>
   );
}
