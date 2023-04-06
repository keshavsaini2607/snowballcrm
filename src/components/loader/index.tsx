import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
   return (
      <div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.6)] flex items-center justify-center absolute top-0 left-0">
         <div className="w-[40%] p-10 bg-white text-center">
            <CircularProgress color="warning" />
            <h1 className="text-primary text-xl font-extrabold">Loading</h1>
         </div>
      </div>
   );
};

export default Loader;
