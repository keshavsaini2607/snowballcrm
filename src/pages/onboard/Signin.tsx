import React, { FormEvent, useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { signinUser } from "../../api/auth";
import { SigninProps } from "../../api/auth/types";
import { useNavigate } from "react-router-dom";
import {
   createOrganization,
   getOrganizations,
   selectOrganization,
} from "../../api/organizations";
import { CreateOrganizationPayload } from "../../api/organizations/types";

const Signin = () => {
   const [currentStep, setCurrentStep] = useState(0);
   const [organizations, setOrganizations] = useState<any>([]);
   const [organization, setOrganization] = useState<any>(null);
   const [formValues, setFormValues] = useState<any>();
   const [signinToken, setSigninToken] = useState("");
   const [newOrganization, setNewOrganization] = useState("");
   const navigate = useNavigate();

   

   function handleInputChange(event: any) {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
   }

   const handleOnboard = async (e: FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      params.append("username", formValues.username);
      params.append("password", formValues.password);

      if (currentStep === 0) {
         signinMutation.mutate(params);
      }

      if (currentStep === 1) {
         selectOrganizationMutation.mutate(organization);
      }

      if (currentStep === 2) {
         let payload: CreateOrganizationPayload = {
            name: newOrganization,
            description: newOrganization,
            active: true,
            website: newOrganization,
         };

         createOrganizationMutation.mutate(payload);
      }
   };

   const createOrganizationMutation = useMutation(createOrganization, {
      async onSuccess(data, variables, context) {
         const orgs = await getOrganizations(signinToken);
         setOrganizations(orgs);
         if(orgs) {
            setCurrentStep(1);
         }
      },
      onError(error, variables, context) {
         
         
      },
   });

   const selectOrganizationMutation = useMutation(selectOrganization, {
      onSuccess(data, variables, context) {
         
         localStorage.setItem("access_token", data.access_token);
         setTimeout(() => {
            navigate("/");
         }, 0);
      },
      onError(error, variables, context) {
         
      },
   });

   const signinMutation = useMutation(signinUser, {
      async onSuccess(data, variables, context) {
         setSigninToken(data.access_token);
         

         const orgs = await getOrganizations(data.access_token);
         setOrganizations(orgs);

         

         if (orgs?.length < 1) {
            setCurrentStep(2);
         } else {
            setCurrentStep(1);
         }
      },
      onError(error, variables, context) {
         
         setCurrentStep(2);
      },
   });

   return (
      <form onSubmit={handleOnboard} className="w-[100%]">
         {currentStep === 0 ? (
            <>
               <input
                  placeholder="Username"
                  type="text"
                  className="text_input"
                  name="username"
                  onChange={handleInputChange}
               />
               <input
                  placeholder="Password"
                  type="password"
                  className="text_input mt-4"
                  name="password"
                  onChange={handleInputChange}
               />
            </>
         ) : null}
         {currentStep === 1 && organizations.length >= 1 ? (
            <>
               <FormControl fullWidth>
                  <label>Select Organization</label>
                  <Select
                     // labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={organization}
                     color="primary"
                     // label="Select your organization"
                     className="inputLabel text-gray-700 bg-white outline-none"
                     onChange={(e) => setOrganization(e.target.value as string)}
                  >
                     {organizations?.map((org: any) => (
                        <MenuItem value={org?.id}>{org?.name}</MenuItem>
                     ))}
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
                  className="text_input"
                  value={newOrganization}
                  onChange={(e) => setNewOrganization(e.target.value)}
               />
            </>
         ) : null}
         <button
            className="bg-primary px-16 py-2 text-white w-full mt-4"
            type="submit"
         >
            {signinMutation.isLoading || selectOrganizationMutation.isLoading
               ? "Please wait..."
               : "Next"}
         </button>
      </form>
   );
};

export default Signin;
