import React, { FormEvent, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useMutation } from "react-query";
import { signinUser } from "../../api/auth";
import { SigninProps } from "../../api/auth/types";
import { useNavigate } from "react-router-dom";

const Signin = () => {
   const [currentStep, setCurrentStep] = useState(0);
   const [organization, setOrganization] = useState("");
   const [formValues, setFormValues] = useState<any>();
   const navigate = useNavigate();

   function handleInputChange(event: any) {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
   }

   const handleOnboard = (e: FormEvent) => {
      e.preventDefault();
      if (currentStep >= 2) {
         setCurrentStep(0);
         return;
      }

      const params = new URLSearchParams();

      params.append('username', formValues.username);
      params.append('password', formValues.password);

      if (currentStep === 0) {
         signinMutation.mutate(params)
      }
   };

   const signinMutation = useMutation(signinUser, {
      onSuccess(data, variables, context) {
         localStorage.setItem('access_token', data.access_token);
         console.log("signin success", data);
         // setCurrentStep(p => p + 1);
         setTimeout(() => {navigate('/')}, 0);
      },
      onError(error, variables, context) {
         console.log("signin error", error, 'v', context);
      },
   });

   return (
      <form onSubmit={handleOnboard}>
         {currentStep === 0 ? (
            <>
               <input
                  placeholder="Username"
                  type="text"
                  className="input"
                  name="username"
                  onChange={handleInputChange}
               />
               <input
                  placeholder="Password"
                  type="password"
                  className="input mt-4"
                  name="password"
                  onChange={handleInputChange}
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
            type="submit"
         >
            {signinMutation.isLoading ? 'Please wait...' : 'Next'}
         </button>
      </form>
   );
};

export default Signin;
