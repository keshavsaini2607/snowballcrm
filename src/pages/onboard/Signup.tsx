import React, { FormEvent, useState } from "react";
import { UserRegistrationStep, verifyEmailTxt } from "../../utils/constants";
import { GiCheckMark } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";
import { emailSignup, emailVerification } from "../../api/auth";

const Signup = () => {
   const [currentStep, setCurrentStep] = useState(0);
   const [username, setUsername] = useState("");

   // const isEmailVerified = useQuery("emailVerification", emailVerification, {staleTime: 3000});

   const handleOnboard = (e: FormEvent) => {
      e.preventDefault();

      if (currentStep >= 3) {
         setCurrentStep(0);
         return;
      }
      if(currentStep === 1) {
         emailSignupMutation.mutate(username);
      }
      if(!emailSignupMutation.isLoading) {

         setCurrentStep((p) => p + 1);
      }
      console.log("mutating");
      
   };

   const emailSignupMutation = useMutation(emailSignup, {
      onSuccess: (data) => {
         console.log({data})
         if(data.status === UserRegistrationStep.VERIFIED) {
            setCurrentStep(2);
         }
      },
      onError: (error) => {
         console.log("Error signing up", error);
      },
   });
   

   return (
      <form onSubmit={handleOnboard}>
         {currentStep === 0 ? (
            <div className="flex flex-col gap-4">
               <input
                  placeholder="Email Id"
                  type="email"
                  className="input"
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />
               <div className="flex items-center gap-4">
                  <input type="checkbox" />
                  <p>
                     I would like to receive marketing communication from
                     Snowball and Snowball’s products, services, and events.
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <input type="checkbox" required />
                  <p>
                     I agree to the{" "}
                     <span className="underline cursor-pointer">
                        Terms of Service
                     </span>{" "}
                     and{" "}
                     <span className="underline cursor-pointer">
                        Privacy Policy
                     </span>
                     .
                  </p>
               </div>
            </div>
         ) : null}
         {currentStep === 1 ? (
            <>
               <h1 className="font-extrabold my-4">
                  Please verify your email ID
               </h1>
               <p>{verifyEmailTxt}</p>
            </>
         ) : null}
         {currentStep === 2 ? (
            <>
               <h2 className="flex items-center gap-2 mb-2">
                  Your email ID is verified <GiCheckMark color="green" />
               </h2>
               <input
                  placeholder="Password"
                  type="password"
                  className="input"
               />
            </>
         ) : null}
         {currentStep === 3 ? (
            <>
               <input
                  placeholder="Organization Name"
                  type="text"
                  className="input"
               />
            </>
         ) : null}
         <button
            className="bg-primary px-16 py-2 text-white w-full mt-4"
            type="submit"
         >
            Next
         </button>
      </form>
   );
};

export default Signup;
