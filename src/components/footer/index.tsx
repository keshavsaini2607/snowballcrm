import React from "react";

const Footer = () => {
   return (
      <footer className="flex flex-col md:flex-row items-center gap-10 px-10 py-5 border-t-[1px] border-t-gray-400 mt-10">
         <span className="md:border-r-[1px] md:border-r-gray-400 md:pr-5">&#169; {new Date().getFullYear()} SnowBall</span>
         <span className="md:border-r-[1px] md:border-r-gray-400 md:pr-5">Terms of Service</span>
         <span className="md:border-r-[1px] md:border-r-gray-400 md:pr-5">Privacy Notice</span>
         <span className="md:border-r-[1px] md:border-r-gray-400 md:pr-5">Contact Us</span>
         <span>About Us</span>
      </footer>
   );
};

export default Footer;
