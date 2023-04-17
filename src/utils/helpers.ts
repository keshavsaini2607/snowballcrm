export const handleError = (error: any) => {
   console.error("error", error);
   throw new Error(error);
};

export const handleUnderscore = (str: any) => {
   let name: string = `${str}`;
   if (name.length > 50) return "";
  
   else {
      name = name.replace(/_/g, " ");
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      return capitalized;
   }
};
