import React, { useEffect, useState } from "react";

const CellInput = ({ cell }: any) => {
    
   const [cellValue, setCellValue] = useState("");
   useEffect(() => {
      setCellValue(cell.value);
   }, [cell]);
   return (
      <input
         className="w-[100%] px-2 py-3"
         value={cellValue}
         onChange={(e) => setCellValue(e.target.value)}
      />
   );
};

export default CellInput;
