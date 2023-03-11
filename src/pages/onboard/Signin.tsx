import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

const Signin = () => {
   const [currentStep, setCurrentStep] = useState(0);
   const [organization, setOrganization] = useState("");

   const handleOnboard = () => {
      if (currentStep >= 2) {
         setCurrentStep(0);
         return;
      }
      setCurrentStep((p) => p + 1);
   };

   return (
      <div>
         {currentStep === 0 ? (
            <>
               <input placeholder="Username" type="text" className="input" />
               <input
                  placeholder="Password"
                  type="password"
                  className="input mt-4"
               />
            </>
         ) : null}
         {currentStep === 1 ? (
            <>
               <FormControl fullWidth>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={organization}
                     color="primary"
                     label="Select your organization"
                     className="inputLabel text-gray-700"
                     onChange={(e) => setOrganization(e.target.value as string)}
                  >
                     <MenuItem value={10}>Organization 1</MenuItem>
                     <MenuItem value={20}>Organization 2</MenuItem>
                     <MenuItem value={30}>Organization 3</MenuItem>
                  </Select>
               </FormControl>
            </>
         ) : null}
         {currentStep === 2 ? (
            <>
               <h2 className="flex items-center gap-2 mb-2">
                  It looks like you are not associated with any organisation.
                  Please enter your organisation name to continue with CRM
                  platform
               </h2>
               <input
                  placeholder="Organization name"
                  type="text"
                  className="input"
               />
            </>
         ) : null}
         <button
            className="bg-primary px-16 py-2 text-white w-full mt-4"
            onClick={handleOnboard}
         >
            Next
         </button>
      </div>
   );
};

export default Signin;
