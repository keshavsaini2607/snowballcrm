import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet, useLocation } from "react-router-dom";
import { demo } from "../../api/auth";
import Navbar from "../../components/navbar";
import ColorTriangle from "../../assets/hero/triangle_color.svg";
import GradientTriangle from "../../assets/hero/triangle_gradient.svg";
import Dashboard from "../../assets/hero/dashboard.svg";
import QuoteImg from "../../assets/hero/quote.svg";
import HeroImg from "../../assets/hero/hero_img.svg";
import IconImg from "../../assets/hero/icon.svg";
import SignupImg from "../../assets/hero/signup.svg";
import BannerImg from "../../assets/banner.svg";
import { features } from "../../utils/constants";
import SignupBlack from "../../assets/signup_black.svg";
import Footer from "../../components/footer";

const Onboard = () => {
   const location = useLocation();
   console.log(location);
   const { isError, error, isLoading, data } = useQuery("posts", demo, {
      staleTime: 6000,
   });

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (isError && error) {
      return <h1>{`${error}`}</h1>;
   }

   return (
      <div className="relative">
         <Navbar />
         <div className="flex items-start justify-between px-10 py-20 z-10">
            <div className="w-[45%]">
               <h1 className="text-5xl mb-5 font-extrabold">
                  Business-centric CRM to{" "}
                  <span className="text-primary">elevate opportunity</span>
               </h1>
               <p>
                  With <span className="font-extrabold">Snowball CRM</span>, you
                  can migrate your business to digital platform and manage your
                  customer relationships more easily. Whether you're ready to
                  move beyond spreadsheets or simply replace legacy sales tools,
                  we are here to help you get started.
               </p>
            </div>
            <div className="flex flex-col items-start w-[30%] gap-3 z-10">
               <h4 className="text-xl font-bold">
                  Get started with our user-friendly platform for awesome
                  customer relationship.
               </h4>
               {location.pathname !== "/signin" ? (
                  <p>
                     Already with SnowBall;{"  "}
                     <Link to="/signin">
                        <span className="underline text-blue-800 cursor-pointer">
                           Sign In{" "}
                        </span>
                     </Link>
                     here
                  </p>
               ) : (
                  <p>
                     New to SnowBall;{"  "}
                     <Link to="/">
                        <span className="underline text-blue-800 cursor-pointer">
                           Sign Up{" "}
                        </span>
                     </Link>
                     here
                  </p>
               )}

               <Outlet />
            </div>
         </div>
         <div className="px-10 z-10 flex items-start justify-between w-full mt-16">
            <img src={Dashboard} alt="dashboard" className="z-10" />
            <div className="text-white w-[40%]">
               <h2 className="font-extrabold text-5xl mb-7">
                  A new way to look at your customer pipeline
               </h2>
               <p>
                  All of your proposal information, including emails and more,
                  can be easily captured in SnowBall CRM so that you have all
                  the necessary information on hand to move the conversation
                  forward. Manage your pipelines effectively, and win more
                  customers.
               </p>
            </div>
         </div>
         <div className="px-10 z-10 flex items-center justify-between w-full mt-10">
            <img src={QuoteImg} alt="back_img" className="bg-white" />
            <img src={HeroImg} alt="back_img" className="" />
            <div className="relative">
               <img
                  src={IconImg}
                  alt="back_img"
                  className="w-[95%] pl-5 mt-10"
               />
               <img
                  src={SignupImg}
                  alt="back_img"
                  className="absolute bottom-28"
               />
            </div>
         </div>
         <div className="px-10 z-10 flex items-center justify-between w-full mt-10">
            <img src={BannerImg} alt="back_img" className="" />
         </div>
         <div className="px-10 z-10 flex flex-col items-center justify-between w-max mx-auto relative mt-20">
            <h2 className="text-5xl font-extrabold mb-10">
               More reasons to try SnowBall CRM today
            </h2>
            <div className="flex items-end justify-end w-full">
               <img src={SignupBlack} alt="signup" />
            </div>
         </div>
         <div className="px-10 z-10 flex items-center justify-between w-full mt-20 pb-10">
            {features.map((feature) => (
               <div
                  className="w-[24%] flex items-center flex-col text-center gap-3"
                  key={feature.id}
               >
                  <h2 className="text-[#477bab] text-2xl font-extrabold">
                     {feature.title}
                  </h2>
                  <img
                     src={`/assets/features/${feature.img}.svg`}
                     alt="feature"
                     className="h-[180px]"
                  />
                  <p className="text-gray-700">{feature.para}</p>
               </div>
            ))}
         </div>
         <Footer />
         <img
            src={GradientTriangle}
            alt="back_img"
            className="absolute top-0 right-0 -z-10 h-[200vh]"
         />
         <img
            src={ColorTriangle}
            alt="back_img"
            className="absolute top-0 right-0 -z-10 h-[200vh]"
         />
      </div>
   );
};

export default Onboard;
