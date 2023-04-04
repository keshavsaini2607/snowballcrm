import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import ColorTriangle from "../../assets/hero/triangle_color.svg";
import GradientTriangle from "../../assets/hero/triangle_gradient.svg";
import Dashboard from "../../assets/hero/dashboard.svg";
import QuoteImg from "../../assets/hero/quote.svg";
import HeroImg from "../../assets/hero/hero_img.svg";
import IconImg from "../../assets/hero/icon.svg";
import SignupImg from "../../assets/hero/signup.svg";
import BannerImg from "../../assets/banner.svg";
import Footer from "../../components/footer";
import { features, summary } from "../../utils/constants";

const Onboard = () => {
   const location = useLocation();
   let pathName = location.pathname.split('/')[1];
   console.log({pathName});

   return (
      <div className="relative">
         {localStorage.getItem("access_token") && <Navigate to="/dashboard" />}
         <Navbar />
         <div className="flex flex-col md:flex-row items-start justify-between px-10 md:py-20 z-10">
            <div className="md:w-[45%]">
               <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5 font-extrabold">
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
            <div className="flex flex-col items-start md:w-[40%] lg:w-[30%] gap-3 mt-10 md:mt-0 z-10">
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
         <div className="px-10 z-10 flex flex-col md:flex-row items-start justify-between w-full mt-16">
            <img
               src={Dashboard}
               alt="dashboard"
               className="z-10 w-[100%] md:w-[50%]"
            />
            <div className="lg:text-white md:w-[40%]">
               <h2 className="font-extrabold text-2xl mt-10 md:mt-0 md:text-4xl lg:text-5xl mb-7">
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
         <div className={`px-10 z-10 flex flex-col md:flex-row items-center justify-between w-full ${pathName === 'signin' ? 'mt-24' : 'mt-10' }`}>
            <img
               src={QuoteImg}
               alt="back_img"
               className="bg-white w-[100%] md:w-[50%] mb-10 md:mb-0"
            />
            <img src={HeroImg} alt="back_img" className="" />
            <div className="relative">
               <img
                  src={IconImg}
                  alt="back_img"
                  className="w-[95%] pl-5 mt-10 hidden lg:block"
               />
               <img
                  src={SignupImg}
                  alt="back_img"
                  className="absolute bottom-28 hidden lg:block"
               />
            </div>
         </div>
         <div className="px-10 z-10 flex items-center justify-between w-full mt-10">
            <img src={BannerImg} alt="back_img" className="" />
         </div>
         <div
            id="Features"
            className="flex items-center flex-col justify-center py-10 mt-10"
         >
            <div className="flex items-center flex-col md:flex-row md:gap-20">
               <img src="/features/header.svg" />
               <img src="/features/signup.svg" />
            </div>
            <div className="flex items-center justify-center flex-wrap gap-y-6 mt-8">
               {features.map((feature) => (
                  <div
                     key={feature.id}
                     className="flex items-center justify-center w-[44%] md:w-[24%] hover:scale-105  transition-all delay-200"
                  >
                     <img src={feature.icon} alt="icon" />
                     <div className="flex flex-col gap-2 ml-3">
                        <span className="font-extrabold">
                           {feature.heading}
                        </span>
                        <span className="w-[50%] text-sm ">
                           {feature.subHeading}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div id="summary" className="p-10">
            <div className="flex md:items-center flex-col md:flex-row md:gap-40">
               <div>
                  <div className="flex flex-col text-2xl md:text-4xl gap-2">
                     <span className="text-primary">More reasons</span>
                     <span className="text-[#9C9B9B]">
                        to choose SnowBall CRM today
                     </span>
                  </div>
                  <div className="text-xl md:text-3xl flex flex-col md:flex-row md:items-center md:gap-40 mt-2">
                     <span>
                        Integrate with your{" "}
                        <span className="text-primary font-extrabold">ERP</span>
                     </span>
                     <img src="/signuporange.svg" alt="signup" className="w-[50%] md:w-auto mt-2 md:mt-0" />
                  </div>
               </div>
               <img src="/summary.svg" alt="summary" />
            </div>
            <div id="content" className="flex flex-col md:flex-row justify-between mt-10">
               {summary.map((item) => (
                  <div key={item.id} className="md:w-[20%]">
                     <h1 className="border-b-[3px] text-[#252328] font-extrabold border-b-primary text-2xl mb-4 pb-2">
                        {item.title}
                     </h1>
                     <p className="text-[#252328]">{item.para}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className="flex items-center justify-between mt-20 ">
            <span></span>
            <img src="/banner.svg" alt="banner" className="flex items-end " />
         </div>
         <div className="p-10 mt-10 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col gap-4 md:w-[50%] mb-4 md:mb-0">
               <span className="text-[#9C9B9B] text-4xl">
                  Powerful Alone, Better Together
               </span>
               <span>
                  You need a CRM platform that’s connected to every part of your
                  business.
               </span>
               <span>
                  Our approach to product development takes the critical
                  elements of customer experience management — Content,
                  Messaging, Automation, Data, and Reporting — and brings them
                  into a single platform that’s built to grow with your company.
               </span>
               <span>
                  Each SnowBall product is powerful on its own, but the real
                  magic happens when you use them together.
               </span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:w-[50%]">
               <div className="flex items-center flex-col gap-4">
                  <div className="text-4xl bg-[#477AAA] rounded-full w-[20vh] h-[20vh] md:w-[17vw] md:h-[17vw] flex items-center justify-center text-white">
                     74%
                  </div>
                  <span className="md:w-[50%] text-center">
                     Customers with SnowBall CRM see 74% increase in deal close
                     rate after 12 months
                  </span>
               </div>
               <div className="flex items-center flex-col gap-4">
                  <div className="text-4xl bg-[#477AAA] rounded-full md:w-[17vw] w-[20vh] h-[20vh] md:h-[17vw] flex items-center justify-center text-white">
                     124%
                  </div>
                  <span className="md:w-[50%] text-center">
                     Customers with SnowBall see a 124% increase in deals
                     close-won after 12 months
                  </span>
               </div>
            </div>
         </div>
         <Footer />
         <img
            src={GradientTriangle}
            alt="back_img"
            className="absolute top-0 right-0 -z-10 h-[200vh] hidden lg:block"
         />
         <img
            src={ColorTriangle}
            alt="back_img"
            className="absolute top-0 right-0 -z-10 h-[200vh] hidden lg:block"
         />
      </div>
   );
};

export default Onboard;
