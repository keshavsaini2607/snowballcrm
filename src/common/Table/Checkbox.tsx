import React from "react";

//@ts-ignore
const Checkbox = React.forwardRef(({ intermediate, ...rest }, ref) => {
   const defaultRef = React.useRef();
   const resolvedRef: any = ref || defaultRef;

   React.useEffect(() => {
      //@ts-ignore
      resolvedRef.current.intermediate = intermediate;
   }, [resolvedRef, intermediate]);

   return (
      <>
      
         <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
   );
});

export default Checkbox;
