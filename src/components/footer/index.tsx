import React from "react";

const Footer = () => {
   return (
      <footer className="bg-[#23374A] p-10">
         <div className=" p-10 flex flex-col md:flex-row items-center justify-center ">
            <div className="flex flex-col md:flex-row mb-10 md:mb-0 text-white md:w-[40%] items-center gap-4">
               <img src="/crmwhite.svg" alt="" />
               <span className="md:w-[40%] text-center md:text-start">
                  Find meaning in the form you understand from billions of raw
                  data.Harness reliable insights with Snow Ball products and
                  services.
               </span>
            </div>
            <div className="flex flex-col md:flex-row  text-center md:text-start gap-20 text-white md:w-[60%]">
               <ul>
                  <p className="text-xl font-extrabold mb-2">Company</p>
                  <li>About Us</li>
                  <li>Privacy policy</li>
                  <li>Terms and conditions</li>
               </ul>
               <ul>
                  <p className="text-xl font-extrabold mb-2">Services</p>
                  <li>What we do</li>
                  <li>Natural language</li>
                  <li>Intelligent document processing</li>
                  <li>SnowBall CRM</li>
               </ul>
               <ul>
                  <p className="text-xl font-extrabold mb-2">Contact Us</p>
                  <li>+61 - 410 896 039</li>
                  <li>contact@snowball-a-vibe.com</li>
                  <li>141 Marquends road, Truganina</li>
                  <li>Company number: 73499626178</li>
               </ul>
            </div>
         </div>

         <div className="flex items-center gap-4 justify-center">
            <div className="w-[40%] bg-[#B9B2B2] p-[1px]"></div>
            <img src="/fb.svg" alt="" />
            <img src="/linkedin.svg" alt="" />
            <img src="/insta.svg" alt="" />
            <div className="w-[40%] bg-[#B9B2B2] p-[1px]"></div>
         </div>
         <div className="flex flex-col items-center text-white mt-8 justify-center">
            <span>SnowBall</span>
            <span>Copy right {new Date().getFullYear()} SnowBall, Inc.</span>
         </div>
      </footer>
   );
};

export default Footer;
