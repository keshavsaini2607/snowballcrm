import React, { FormEvent, useEffect, useState } from "react";
import { UserRegistrationStep, verifyEmailTxt } from "../../utils/constants";
import { GiCheckMark } from "react-icons/gi";
import { useMutation } from "react-query";
import { emailSignup, emailVerification, signup } from "../../api/auth";
import { SignupProps, VerificationProps } from "../../api/auth/types";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
   const navigate = useNavigate();
   const [currentStep, setCurrentStep] = useState(0);
   const [username, setUsername] = useState("");
   const [token, setToken] = useState<any>("");
   const [rToken, setRToken] = useState<any>("");
   const [password, setPassword] = useState("");
   const location = useLocation();
   const queryString = location.search;

   function extractTokens(queryString: string) {
      const params = new URLSearchParams(queryString);
      const token = params.get("token");
      const rtoken = params.get("rtoken");
      return { token, rtoken };
   }

   useEffect(() => {
      (async () => {
         const { token, rtoken } = extractTokens(queryString);
         setToken(token);
         setRToken(rtoken);
         if (token && rtoken) {
            let props: VerificationProps = {
               t_k: token,
               r_t: rtoken,
            };
            await emailVerification(props);
            setCurrentStep(2);
         }
      })();
   }, []);

   const handleOnboard = async (e: FormEvent) => {
      e.preventDefault();

      if (currentStep >= 3) {
         setCurrentStep(0);
         return;
      }
      if (currentStep === 0) {
         emailSignupMutation.mutate(username);
      }

      if (currentStep === 1) {
         let props: VerificationProps = {
            t_k: token,
            r_t: rToken,
         };
         const isEmailVerified = await emailVerification(props);
         if (isEmailVerified) {
            setCurrentStep((p) => p + 1);
         }
         return;
      }

      if (currentStep === 2) {
         signupMutation.mutate({
            token: token,
            password: password,
            r_token: rToken,
         } as SignupProps);
      }
   };

   const emailSignupMutation = useMutation(emailSignup, {
      onSuccess: (data) => {
         if (data.status === UserRegistrationStep.VERIFIED) {
            setCurrentStep(2);
         } else {
            setCurrentStep((p) => p + 1);
         }
      },
      onError: (error) => {},
   });

   const signupMutation = useMutation(signup, {
      onSuccess(data) {
         navigate("/signin");
      },
      onError(error) {},
   });

   return (
      <form onSubmit={handleOnboard}>
         {currentStep === 0 ? (
            <div className="flex flex-col gap-4">
               <input
                  placeholder="Email Id"
                  type="email"
                  className="text_input"
                  onChange={(e) => setUsername(e.target.value)}
                  required
               />
               <div className="flex items-center gap-4">
                  <input type="checkbox" className="min-w-[5%]" />
                  <p>
                     I would like to receive marketing communication from
                     Snowball and Snowball’s products, services, and events.
                  </p>
               </div>
               <div className="flex items-center gap-4">
                  <input type="checkbox" required  className="min-w-[5%]"/>
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
                  className="text_input"
                  onChange={(e) => setPassword(e.target.value)}
               />
            </>
         ) : null}
         {currentStep === 3 ? (
            <>
               <input
                  placeholder="Organization Name"
                  type="text"
                  className="text_input"
               />
            </>
         ) : null}
         <button
            className="bg-primary px-16 py-2 text-white w-full mt-4"
            type="submit"
         >
            {emailSignupMutation.isLoading ? "Please wait..." : "Next"}
         </button>
      </form>
   );
};

export default Signup;
