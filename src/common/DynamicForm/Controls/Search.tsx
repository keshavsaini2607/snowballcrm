import * as React from "react";
import useAutocomplete from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import { useQuery } from "react-query";
import { getDepartments } from "../../../api/departments";

const Input = styled("input")(({ theme }) => ({
   width: 200,
   backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
   color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
   width: 200,
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

type props = {
   column: any;
   name: any;
   onBlur?: any;
}

export default function UseAutocomplete({ column, name, onBlur }: props) {
   
   const { isLoading, data, isError, isSuccess } = useQuery(
      "departments",
      getDepartments
   );
   const [options, setOptions] = React.useState<any[]>([]);

   React.useEffect(() => {
      const datas: string[] = [];
      data?.forEach((data: any) => {
         let alreadyExists = datas.includes(data.name);
         if(!alreadyExists) {
            datas.push(data.name);
         }
      });

      setOptions(datas);
   }, [data, isSuccess]);
   
   const {
      getRootProps,
      getInputLabelProps,
      getInputProps,
      getListboxProps,
      getOptionProps,
      groupedOptions,
   } = useAutocomplete({
      id: "use-autocomplete-demo",
      options: options,
      getOptionLabel: (option) => option,
   });

   return (
      <div>
         <div {...getRootProps()}>
            <Input
               {...getInputProps()}
               className="input"
               placeholder={column.key}
               name={name}
               onBlur={(e) => onBlur(e)}
            />
         </div>
         {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()} className="input">
               {(groupedOptions as typeof options).map((option, index) => (
                  <li {...getOptionProps({ option, index })} className="p-2">
                     {option}
                  </li>
               ))}
            </Listbox>
         ) : null}
      </div>
   );
}
