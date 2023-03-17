import React, { FormEvent, useState } from "react";
import { UserRegistrationStep, verifyEmailTxt } from "../../utils/constants";
import { GiCheckMark } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";
import { emailSignup, emailVerification, signup } from "../../api/auth";
import { SignupProps, VerificationProps } from '../../api/auth/types';
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const Signup = () => {
   const navigate = useNavigate();
   const [currentStep, setCurrentStep] = useState(0);
   const [username, setUsername] = useState("");
   const location = useLocation();
   console.log({location})

   

   const handleOnboard = (e: FormEvent) => {
      e.preventDefault();

      if (currentStep >= 3) {
         setCurrentStep(0);
         return;
      }
      if(currentStep === 0) {
         console.log("mutating");
         emailSignupMutation.mutate(username);
      }

      if(currentStep === 1) {
         // const isEmailVerified = useQuery(['emailVerification', [{t_k: "", r_t: ""} as VerificationProps]], emailVerification);
      }

      if(currentStep === 2) {
         signupMutation.mutate({
            token: "wmX9j2ygZGp8h7eUXHeqXYjxw3rQzEtq",
            password: "Kash@9828",
            r_token: "yn4GB9mNyVk87tzx7Xt6vJ8nbFw8uMXv"
         } as SignupProps)
      }
      if(!emailSignupMutation.isSuccess) {
         setCurrentStep((p) => p + 1);
      }
      console.log({currentStep});
   };
   console.log({currentStep});


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

   const verifyEmailMutation = useMutation(emailVerification, {
      onSuccess(data, variables, context) {
          console.log("verified");
          setCurrentStep((p) => p + 1);
      },
      onError(error, variables, context) {
          console.log('error verifying', error);
      },
   })

   const signupMutation = useMutation(signup, {
      onSuccess(data) {
         console.log("user created", data);
         navigate('/signin');
      },
      onError(error) {
         console.log('error creating user', error);
      }
   })
   

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
